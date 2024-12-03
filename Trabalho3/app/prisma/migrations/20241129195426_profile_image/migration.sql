/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ProfileImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProfileImage_userId_key" ON "ProfileImage"("userId");
