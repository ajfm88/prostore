"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";

// Toggle a product in the current user's wishlist
export async function toggleWishlist(productId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("Please sign in to save items to your wishlist");
    }

    // Already saved? Remove it.
    const existing = await prisma.wishlist.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existing) {
      await prisma.wishlist.delete({
        where: { userId_productId: { userId, productId } },
      });

      revalidatePath("/user/wishlist");

      return {
        success: true as const,
        isInWishlist: false,
        message: "Removed from wishlist",
      };
    }

    // Make sure the product exists before saving it
    const product = await prisma.product.findFirst({ where: { id: productId } });
    if (!product) throw new Error("Product not found");

    await prisma.wishlist.create({ data: { userId, productId } });

    revalidatePath("/user/wishlist");

    return {
      success: true as const,
      isInWishlist: true,
      message: "Added to wishlist",
    };
  } catch (error) {
    return { success: false as const, message: formatError(error) };
  }
}

// Get the products in the current user's wishlist (newest first)
export async function getMyWishlist() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return [];

  const items = await prisma.wishlist.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { product: true },
  });

  return convertToPlainObject(items.map((item) => item.product));
}

// Get just the product IDs saved by the current user (seeds the heart state)
export async function getWishlistProductIds() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return [];

  const items = await prisma.wishlist.findMany({
    where: { userId },
    select: { productId: true },
  });

  return items.map((item) => item.productId);
}
