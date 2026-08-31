-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "discountPrice" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "promoCode" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "discountPrice" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "promoCode" TEXT;

-- CreateTable
CREATE TABLE "Promo" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "minimumOrderValue" DECIMAL(12,2) NOT NULL,
    "startsAt" TIMESTAMP(6) NOT NULL,
    "endsAt" TIMESTAMP(6) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "promo_code_idx" ON "Promo"("code");
