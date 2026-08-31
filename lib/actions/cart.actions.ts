"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { auth } from "@/auth";
import { formatError } from "../utils";
import { cartItemSchema, insertCartSchema } from "../validators";
import { prisma } from "@/db/prisma";
import { CartItem } from "@/types";
import { Prisma } from "@/lib/generated/prisma";
import { convertToPlainObject, formatCurrency, round2 } from "../utils";

// A promo needs only these fields to price a cart
type PromoForPricing = {
  percentage: number;
  minimumOrderValue: Prisma.Decimal | string | number;
};

// Calculate cart price based on items, applying a promo discount when eligible
const calcPrice = (
  items: z.infer<typeof cartItemSchema>[],
  promo?: PromoForPricing | null,
) => {
  const itemsPrice = round2(items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0));
  // Discount is a percentage of the items subtotal, only once the minimum is met
  const discountPrice =
    promo && itemsPrice >= Number(promo.minimumOrderValue)
      ? round2((itemsPrice * promo.percentage) / 100)
      : 0;
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = round2(itemsPrice - discountPrice + shippingPrice + taxPrice);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    discountPrice: discountPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

// Look up a promo code and return it only if it is currently redeemable
// (internal helper — not exported, so it never becomes a public server action)
async function getValidatedPromo(code: string) {
  const promo = await prisma.promo.findUnique({ where: { code } });
  if (!promo) return null;
  const now = new Date();
  if (now < promo.startsAt || now > promo.endsAt) return null;
  if (promo.count <= 0) return null;
  return promo;
}

// Add item to cart in database
export const addItemToCart = async (data: z.infer<typeof cartItemSchema>) => {
  try {
    // Check for session cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) throw new Error("Cart Session not found");
    // Get session and user ID
    const session = await auth();
    const userId = session?.user?.id as string | undefined;
    // Get cart from database
    const cart = await getMyCart();
    // Parse and validate submitted item data
    const item = cartItemSchema.parse(data);
    // Find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) throw new Error("Product not found");

    if (!cart) {
      // Create new cart object
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });
      // Add to database
      await prisma.cart.create({
        data: newCart,
      });

      // Revalidate product page
      revalidatePath(`/product/${product.slug}`);
      revalidatePath("/cart");

      return {
        success: true,
        message: `${product.name} added to cart successfully`,
      };
    } else {
      // Check for existing item in cart
      const existItem = (cart.items as CartItem[]).find((x) => x.productId === item.productId);
      // If not enough stock, throw error
      if (existItem) {
        if (product.stock < existItem.qty + 1) {
          throw new Error("Not enough stock");
        }

        // Increase quantity of existing item
        (cart.items as CartItem[]).find((x) => x.productId === item.productId)!.qty =
          existItem.qty + 1;
      } else {
        // If stock, add item to cart
        if (product.stock < 1) throw new Error("Not enough stock");
        cart.items.push(item);
      }

      // Re-validate any applied promo so a stale or expired code drops off
      const promo = cart.promoCode ? await getValidatedPromo(cart.promoCode) : null;

      // Save to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          promoCode: promo ? cart.promoCode : null,
          ...calcPrice(cart.items as CartItem[], promo),
        },
      });

      revalidatePath(`/product/${product.slug}`);
      revalidatePath("/cart");

      return {
        success: true,
        message: `${product.name} ${existItem ? "updated in" : "added to"} cart successfully`,
      };
    }
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

//  Get user cart from database
export async function getMyCart() {
  // Check for session cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) return undefined;

  // Get session and user ID
  const session = await auth();
  const userId = session?.user?.id;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
    discountPrice: cart.discountPrice.toString(),
    promoCode: cart.promoCode,
  });
}

// Remove item from cart in database
export async function removeItemFromCart(productId: string) {
  try {
    // Get session cart id
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart Session not found");

    // Get product
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found");

    // Get user cart
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    // Check if cart has item
    const exist = (cart.items as CartItem[]).find((x) => x.productId === productId);
    if (!exist) throw new Error("Item not found");

    // Check if cart has only one item
    if (exist.qty === 1) {
      // Remove item from cart
      cart.items = (cart.items as CartItem[]).filter((x) => x.productId !== exist.productId);
    } else {
      // Decrease quantity of existing item
      (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty = exist.qty - 1;
    }

    // Re-validate any applied promo so a stale or expired code drops off
    const promo = cart.promoCode ? await getValidatedPromo(cart.promoCode) : null;

    // Update cart in database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        promoCode: promo ? cart.promoCode : null,
        ...calcPrice(cart.items as CartItem[], promo),
      },
    });

    // Revalidate product page
    revalidatePath(`/product/${product.slug}`);
    revalidatePath("/cart");

    return {
      success: true,
      message: `${product.name}  ${
        (cart.items as CartItem[]).find((x) => x.productId === productId)
          ? "updated in"
          : "removed from"
      } cart successfully`,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Apply a promo code to the current cart
export async function applyPromo(code: string) {
  try {
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    const normalized = code.trim().toUpperCase();
    if (!normalized) throw new Error("Enter a promo code");

    const promo = await prisma.promo.findUnique({ where: { code: normalized } });
    if (!promo) throw new Error("Invalid promo code");

    const now = new Date();
    if (now < promo.startsAt || now > promo.endsAt) {
      throw new Error("This promo code is not active");
    }
    if (promo.count <= 0) {
      throw new Error("This promo code has been fully redeemed");
    }
    if (Number(cart.itemsPrice) < Number(promo.minimumOrderValue)) {
      throw new Error(
        `Order must be at least ${formatCurrency(promo.minimumOrderValue.toString())} to use this code`,
      );
    }

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        promoCode: normalized,
        ...calcPrice(cart.items as CartItem[], promo),
      },
    });

    revalidatePath("/cart");

    return { success: true, message: `Promo code ${normalized} applied` };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Remove the promo code from the current cart
export async function removePromo() {
  try {
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        promoCode: null,
        ...calcPrice(cart.items as CartItem[], null),
      },
    });

    revalidatePath("/cart");

    return { success: true, message: "Promo code removed" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
