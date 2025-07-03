/*
  Warnings:

  - You are about to drop the column `memory` on the `Problem` table. All the data in the column will be lost.
  - Added the required column `description` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "memory",
ADD COLUMN     "memoryLimit" INTEGER,
ADD COLUMN     "points" INTEGER;

-- CreateTable
CREATE TABLE "ProblemCategory" (
    "problemId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "ProblemCategory_pkey" PRIMARY KEY ("problemId","categoryId")
);

-- AddForeignKey
ALTER TABLE "ProblemCategory" ADD CONSTRAINT "ProblemCategory_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemCategory" ADD CONSTRAINT "ProblemCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
