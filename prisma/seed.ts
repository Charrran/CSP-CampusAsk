import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  console.log("👤 Seeding users...");
  await prisma.user.createMany({ data: [{"id":"cmqdf1els0000d04qdmsgvxe2","name":"cherry","email":"charan@gmail.com","password":"$2b$10$vUywZgUArB8/ZMghpFc1kOedzWTFpJFzWg8SOKCKy13J4RyiPfmw.","role":"STUDENT","isActive":true,"createdAt":"2026-06-14T06:41:10.960Z"},{"id":"cmqdfyy350000qo4qyumvmhpn","name":"Alice (Student)","email":"alice@test.com","password":"$2b$10$YZkcz04kYZqi4Qf8bXdsLeLiRzW3mwwv2oRCxyKAVYxhTuIyTDoLm","role":"STUDENT","isActive":true,"createdAt":"2026-06-14T07:07:15.857Z"},{"id":"cmqdgubcv0002qo4qvt2xbjlk","name":"Dr. Smith (Faculty)","email":"faculty@test.com","password":"$2b$10$Mq9rTSgXaMAoVoJNlp1EKuCSG1tipIdEEs/gCDOxCdQgF25e1TTs2","role":"FACULTY","isActive":true,"createdAt":"2026-06-14T07:31:39.391Z"},{"id":"cmqj2n4l4000e484q6i04g5f7","name":"System Administrator","email":"admin@campusask.edu","password":"$2b$10$IT7G3XLbc7NwTRZ0YLOUR.VUD7W6AjcFkAmXdwmozjAnY844wEOxy","role":"ADMIN","isActive":true,"createdAt":"2026-06-18T05:40:46.456Z"},{"id":"cmqjkuw5s0000004q2e5kv04c","name":"kousik","email":"kousik@gmail.com","password":"$2b$10$cNYdSzvtmcElSPCBpVZm2u8AG9Mi9AVseSPEbaAflP2jMzxBkasVO","role":"STUDENT","isActive":true,"createdAt":"2026-06-18T14:10:41.873Z"}] , skipDuplicates: true });

  console.log("📚 Seeding subjects and chapters...");
  await prisma.subject.upsert({
    where: { id: "cmqdfyxqc0000ko4qodmkdggb" },
    update: {},
    create: {
      id: "cmqdfyxqc0000ko4qodmkdggb",
      name: "Physics",
      chapters: {
        createMany: {
          data: [{"id":"cmqdfyxqe0001ko4qavv303ti","name":"Classical Mechanics"}]
        }
      }
    }
  });
  await prisma.subject.upsert({
    where: { id: "cmqj2n4fs0000484q5m8njcy5" },
    update: {},
    create: {
      id: "cmqj2n4fs0000484q5m8njcy5",
      name: "Mathematics",
      chapters: {
        createMany: {
          data: [{"id":"cmqj2n4g30001484qbpdf6tfs","name":"Calculus"},{"id":"cmqj2n4g30002484q3e1v7vm4","name":"Linear Algebra"},{"id":"cmqj2n4g30003484q58kxyank","name":"Probability"},{"id":"cmqj2n4g30004484qogrwm5gs","name":"Statistics"}]
        }
      }
    }
  });
  await prisma.subject.upsert({
    where: { id: "cmqj2n4gy0005484q20mjmys7" },
    update: {},
    create: {
      id: "cmqj2n4gy0005484q20mjmys7",
      name: "Computer Science",
      chapters: {
        createMany: {
          data: [{"id":"cmqj2n4gz0006484q7crco7r8","name":"Data Structures"},{"id":"cmqj2n4gz0007484q6y9uf34k","name":"Algorithms"},{"id":"cmqj2n4gz0008484qicqodhej","name":"Operating Systems"},{"id":"cmqj2n4gz0009484qsq4cv6w3","name":"Database Systems"}]
        }
      }
    }
  });
  await prisma.subject.upsert({
    where: { id: "cmqj2n4h9000a484qnmfach4v" },
    update: {},
    create: {
      id: "cmqj2n4h9000a484qnmfach4v",
      name: "Chemistry",
      chapters: {
        createMany: {
          data: [{"id":"cmqj2n4ha000b484q9u5lxc5a","name":"Organic Chemistry"},{"id":"cmqj2n4ha000c484qsal46ajc","name":"Inorganic Chemistry"},{"id":"cmqj2n4ha000d484qpyrw25vl","name":"Physical Chemistry"}]
        }
      }
    }
  });
  console.log("❓ Seeding doubts...");
  await prisma.doubt.createMany({ data: [{"id":"cmqdgqumj0001qo4q8898gjcw","title":"How does Quantum Entanglement actually work?","description":"I am struggling to understand the concept of entanglement in the Classical Mechanics chapter. It feels like magic. Can someone explain?","status":"ANSWERED","tags":["physics","classical mechanics","entanglement","actually","chapter","classical","concept"],"isFlagged":false,"flagReason":null,"isRemoved":false,"createdAt":"2026-06-14T07:28:57.739Z","userId":"cmqdf1els0000d04qdmsgvxe2","subjectId":"cmqdfyxqc0000ko4qodmkdggb","chapterId":"cmqdfyxqe0001ko4qavv303ti"},{"id":"cmqjb6z3v0000wo4q07w5qtv5","title":"what is the meaning of derivation?","description":"what is the meaning of derivation?\n\nTags: Calculus, Derivatives","status":"OPEN","tags":[],"isFlagged":false,"flagReason":null,"isRemoved":false,"createdAt":"2026-06-18T09:40:09.403Z","userId":"cmqdf1els0000d04qdmsgvxe2","subjectId":"cmqj2n4fs0000484q5m8njcy5","chapterId":"cmqj2n4g30001484qbpdf6tfs"}] , skipDuplicates: true });

  console.log("💡 Seeding answers...");
  await prisma.answer.createMany({ data: [{"id":"cmqdgy23q0003qo4qvh33tvbc","content":"Quantum entanglement is a physical phenomenon that occurs when a group of particles are generated, interact, or share spatial proximity in a way such that the quantum state of each particle of the group cannot be described independently of the state of the others, including when the particles are separated by a large distance. The topic of quantum entanglement is at the heart of the disparity between classical and quantum physics.","summary":null,"upvoteCount":1,"isFlagged":false,"flagReason":null,"isRemoved":false,"createdAt":"2026-06-14T07:34:34.022Z","doubtId":"cmqdgqumj0001qo4q8898gjcw","userId":"cmqdgubcv0002qo4qvt2xbjlk"}] , skipDuplicates: true });

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
