/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "imageUrl",
ADD COLUMN     "mediaType" TEXT,
ADD COLUMN     "mediaUrl" TEXT;
