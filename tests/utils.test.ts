import { round2, formatCurrency, formatError } from "../lib/utils";

describe("round2", () => {
  test("rounds a number to two decimals", () => {
    expect(round2(4.4955)).toBe(4.5);
    expect(round2(0.1 + 0.2)).toBe(0.3);
  });

  test("accepts numeric strings", () => {
    expect(round2("29.97")).toBe(29.97);
  });

  test("throws for a non-number, non-string value", () => {
    // @ts-expect-error deliberately passing an invalid type
    expect(() => round2(null)).toThrow("value is not a number nor a string");
  });
});

describe("formatCurrency", () => {
  test("formats numbers and numeric strings as USD", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
    expect(formatCurrency("1234.5")).toBe("$1,234.50");
  });

  test("returns NaN for null", () => {
    expect(formatCurrency(null)).toBe("NaN");
  });
});

describe("formatError", () => {
  test("returns the message of a plain Error", () => {
    expect(formatError(new Error("boom"))).toBe("boom");
  });

  test("joins Zod issue messages", () => {
    const zodLike = {
      name: "ZodError",
      issues: [{ message: "Code is required" }, { message: "Count too low" }],
    };
    expect(formatError(zodLike)).toBe("Code is required. Count too low");
  });

  test("reports a Prisma unique-constraint violation", () => {
    const prismaLike = {
      name: "PrismaClientKnownRequestError",
      code: "P2002",
      meta: { target: ["code"] },
    };
    expect(formatError(prismaLike)).toBe("Code already exists");
  });
});
