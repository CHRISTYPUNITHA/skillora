-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "bestseller" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "certificate" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "includes" TEXT[],
ADD COLUMN     "instructor_id" TEXT,
ADD COLUMN     "originalPrice" DECIMAL(10,2),
ADD COLUMN     "whatYouLearn" TEXT[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "title" TEXT;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
