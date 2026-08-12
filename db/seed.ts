import "dotenv/config";
import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import sampleData from "@/db/sample-data";
import { hash } from "@/lib/encrypt";

const { Pool } = pg;

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  const users = await Promise.all(
    sampleData.users.map(async (user) => ({
      ...user,
      password: await hash(user.password),
    })),
  );

  await prisma.product.createMany({ data: sampleData.products });
  await prisma.user.createMany({ data: users });

  console.log("Database seeded successfully");
}

main();
