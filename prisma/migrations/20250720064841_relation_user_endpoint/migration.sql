/*
  Warnings:

  - Made the column `userId` on table `endpoint` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "endpoint" DROP CONSTRAINT "endpoint_userId_fkey";

-- AlterTable
ALTER TABLE "endpoint" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "endpoint" ADD CONSTRAINT "endpoint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
