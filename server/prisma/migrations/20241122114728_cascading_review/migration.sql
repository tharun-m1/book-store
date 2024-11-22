-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_bookId_fkey";

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
