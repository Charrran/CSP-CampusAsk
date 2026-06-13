import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const subjects = [
  {
    name: "Mathematics",
    chapters: ["Calculus", "Linear Algebra", "Probability", "Statistics"],
  },
  {
    name: "Physics",
    chapters: ["Classical Mechanics", "Electromagnetism", "Thermodynamics"],
  },
  {
    name: "Computer Science",
    chapters: [
      "Data Structures",
      "Algorithms",
      "Operating Systems",
      "Database Systems",
    ],
  },
  {
    name: "Chemistry",
    chapters: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"],
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  for (const subject of subjects) {
    const created = await prisma.subject.upsert({
      where: { name: subject.name },
      update: {},
      create: {
        name: subject.name,
        chapters: {
          create: subject.chapters.map((name) => ({ name })),
        },
      },
      include: { chapters: true },
    });

    console.log(
      `  ✅ ${created.name} — ${created.chapters.length} chapters`
    );
  }

  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
