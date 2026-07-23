/*
  Warnings:

  - Added the required column `updatedAt` to the `AdminAuth` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `AdminAuth_username_key` ON `adminauth`;

-- AlterTable
ALTER TABLE `adminauth` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `username` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL;
