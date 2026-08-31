"use server";

import { z } from "zod";
import { Prisma } from "@/lib/generated/prisma";
import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";
import { requireAdmin } from "../auth-guard";
import { PAGE_SIZE } from "../constants";
import { revalidatePath } from "next/cache";
import { insertPromoSchema, updatePromoSchema } from "../validators";

// Get all promos (admin, paginated + searchable by code)
export async function getAllPromos({
  query,
  limit = PAGE_SIZE,
  page,
}: {
  query: string;
  limit?: number;
  page: number;
}) {
  await requireAdmin();

  const queryFilter: Prisma.PromoWhereInput =
    query && query !== "all"
      ? {
          code: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  const data = await prisma.promo.findMany({
    where: { ...queryFilter },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.promo.count({ where: { ...queryFilter } });

  return {
    data: convertToPlainObject(data),
    totalPages: Math.ceil(dataCount / limit),
  };
}

// Get single promo by id
export async function getPromoById(promoId: string) {
  await requireAdmin();

  const data = await prisma.promo.findFirst({ where: { id: promoId } });

  return convertToPlainObject(data);
}

// Create Promo
export async function createPromo(data: z.infer<typeof insertPromoSchema>) {
  try {
    await requireAdmin();

    const promo = insertPromoSchema.parse(data);

    await prisma.promo.create({
      data: {
        code: promo.code.trim().toUpperCase(),
        percentage: promo.percentage,
        count: promo.count,
        minimumOrderValue: promo.minimumOrderValue,
        startsAt: new Date(promo.startsAt),
        endsAt: new Date(promo.endsAt),
      },
    });

    revalidatePath("/admin/promos");

    return { success: true, message: "Promo code created successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update Promo
export async function updatePromo(data: z.infer<typeof updatePromoSchema>) {
  try {
    await requireAdmin();

    const promo = updatePromoSchema.parse(data);
    const promoExists = await prisma.promo.findFirst({
      where: { id: promo.id },
    });

    if (!promoExists) throw new Error("Promo code not found");

    await prisma.promo.update({
      where: { id: promo.id },
      data: {
        code: promo.code.trim().toUpperCase(),
        percentage: promo.percentage,
        count: promo.count,
        minimumOrderValue: promo.minimumOrderValue,
        startsAt: new Date(promo.startsAt),
        endsAt: new Date(promo.endsAt),
      },
    });

    revalidatePath("/admin/promos");

    return { success: true, message: "Promo code updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Delete Promo
export async function deletePromo(id: string) {
  try {
    await requireAdmin();

    const promoExists = await prisma.promo.findFirst({ where: { id } });

    if (!promoExists) throw new Error("Promo code not found");

    await prisma.promo.delete({ where: { id } });

    revalidatePath("/admin/promos");

    return { success: true, message: "Promo code deleted successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
