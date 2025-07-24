-- AlterTable
ALTER TABLE "endpoint" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "endpoint" ADD CONSTRAINT "endpoint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
