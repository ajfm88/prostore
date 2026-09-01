import type { z } from "zod";
import type { cartItemSchema } from "./validators";
import type { Prisma } from "@/lib/generated/prisma";
import { round2 } from "./utils";

// A promo needs only these fields to price a cart
export type PromoForPricing = {
  percentage: number;
  minimumOrderValue: Prisma.Decimal | string | number;
};

// Calculate cart price based on items, applying a promo discount when eligible.
// Pure and deterministic — unit-tested in tests/calc-price.test.ts.
export const calcPrice = (
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
