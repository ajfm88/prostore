import { calcPrice, PromoForPricing } from "../lib/calc-price";

// A minimal cart item shape accepted by calcPrice (only price + qty are read)
const item = (price: string, qty: number) =>
  ({ price, qty }) as unknown as Parameters<typeof calcPrice>[0][number];

describe("calcPrice", () => {
  test("prices a cart with no promo", () => {
    // 2 x 50 = 100 items; shipping 10 (not > 100); tax 15
    const result = calcPrice([item("50.00", 2)]);
    expect(result).toEqual({
      itemsPrice: "100.00",
      shippingPrice: "10.00",
      taxPrice: "15.00",
      discountPrice: "0.00",
      totalPrice: "125.00",
    });
  });

  test("waives shipping once items subtotal exceeds 100", () => {
    // 120 items -> free shipping, tax 18
    const result = calcPrice([item("120.00", 1)]);
    expect(result.shippingPrice).toBe("0.00");
    expect(result.taxPrice).toBe("18.00");
    expect(result.totalPrice).toBe("138.00");
  });

  test("does not discount when the subtotal is below the promo minimum", () => {
    const promo: PromoForPricing = { percentage: 10, minimumOrderValue: "200" };
    // 100 items < 200 minimum -> no discount
    const result = calcPrice([item("50.00", 2)], promo);
    expect(result.discountPrice).toBe("0.00");
    expect(result.totalPrice).toBe("125.00");
  });

  test("applies a percentage discount once the minimum is met", () => {
    const promo: PromoForPricing = { percentage: 10, minimumOrderValue: "100" };
    // 200 items, free shipping (>100), tax on PRE-discount subtotal (30),
    // discount 10% of 200 = 20 -> total 200 - 20 + 0 + 30 = 210
    const result = calcPrice([item("100.00", 2)], promo);
    expect(result.itemsPrice).toBe("200.00");
    expect(result.discountPrice).toBe("20.00");
    expect(result.shippingPrice).toBe("0.00");
    expect(result.taxPrice).toBe("30.00");
    expect(result.totalPrice).toBe("210.00");
  });

  test("computes tax on the pre-discount subtotal, not the discounted amount", () => {
    const promo: PromoForPricing = { percentage: 50, minimumOrderValue: "0" };
    // 100 items: discount 50, but tax stays 15 (0.15 * 100), not 0.15 * 50
    const result = calcPrice([item("100.00", 1)], promo);
    expect(result.taxPrice).toBe("15.00");
    expect(result.discountPrice).toBe("50.00");
    // 100 - 50 + 10 shipping + 15 tax
    expect(result.totalPrice).toBe("75.00");
  });

  test("rounds monetary values to two decimals", () => {
    // 3 x 9.99 = 29.97
    const result = calcPrice([item("9.99", 3)]);
    expect(result.itemsPrice).toBe("29.97");
    expect(result.taxPrice).toBe("4.50"); // 0.15 * 29.97 = 4.4955 -> 4.50
  });

  test("treats a null promo the same as no promo", () => {
    const result = calcPrice([item("50.00", 2)], null);
    expect(result.discountPrice).toBe("0.00");
  });
});
