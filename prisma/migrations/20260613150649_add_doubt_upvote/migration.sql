-- CreateTable
CREATE TABLE "doubt_upvotes" (
    "userId" TEXT NOT NULL,
    "doubtId" TEXT NOT NULL,

    CONSTRAINT "doubt_upvotes_pkey" PRIMARY KEY ("userId","doubtId")
);

-- AddForeignKey
ALTER TABLE "doubt_upvotes" ADD CONSTRAINT "doubt_upvotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doubt_upvotes" ADD CONSTRAINT "doubt_upvotes_doubtId_fkey" FOREIGN KEY ("doubtId") REFERENCES "doubts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
