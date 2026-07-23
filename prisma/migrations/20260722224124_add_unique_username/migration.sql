/*
  Warnings:

  - You are about to drop the column `createdAt` on the `adminauth` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `adminauth` table. All the data in the column will be lost.
  - You are about to alter the column `username` on the `adminauth` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - A unique constraint covering the columns `[username]` on the table `AdminAuth` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `adminauth` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AdminAuth_username_key` ON `AdminAuth`(`username`);
