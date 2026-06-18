import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import fs from "fs";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Fetching data from DB...");

  const users = await prisma.user.findMany();
  const subjects = await prisma.subject.findMany({ include: { chapters: true } });
  const doubts = await prisma.doubt.findMany();
  const answers = await prisma.answer.findMany();

  let seedFile = `import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

`;

  // Insert Users
  seedFile += `  console.log("👤 Seeding users...");\n`;
  seedFile += `  await prisma.user.createMany({ data: ${JSON.stringify(users.map(u => ({
    id: u.id, name: u.name, email: u.email, password: u.password, role: u.role, isActive: u.isActive, createdAt: u.createdAt
  })))} , skipDuplicates: true });\n\n`;

  // Insert Subjects and Chapters
  seedFile += `  console.log("📚 Seeding subjects and chapters...");\n`;
  for (const s of subjects) {
    seedFile += `  await prisma.subject.upsert({
    where: { id: "${s.id}" },
    update: {},
    create: {
      id: "${s.id}",
      name: "${s.name}",
      chapters: {
        createMany: {
          data: ${JSON.stringify(s.chapters.map(c => ({ id: c.id, name: c.name })))}
        }
      }
    }
  });\n`;
  }

  // Insert Doubts
  seedFile += `  console.log("❓ Seeding doubts...");\n`;
  seedFile += `  await prisma.doubt.createMany({ data: ${JSON.stringify(doubts)} , skipDuplicates: true });\n\n`;

  // Insert Answers
  seedFile += `  console.log("💡 Seeding answers...");\n`;
  seedFile += `  await prisma.answer.createMany({ data: ${JSON.stringify(answers)} , skipDuplicates: true });\n\n`;

  seedFile += `  console.log("🎉 Seeding complete!");\n}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`;

  fs.writeFileSync("prisma/seed.ts", seedFile);
  console.log("Successfully wrote to prisma/seed.ts");
}

main().catch(console.error).finally(() => prisma.$disconnect());
