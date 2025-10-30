/*
  Warnings:

  - Added the required column `driverName` to the `Tebengan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tebengan` ADD COLUMN `driverName` VARCHAR(191) NOT NULL;
