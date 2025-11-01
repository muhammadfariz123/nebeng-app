/*
  Warnings:

  - You are about to drop the column `kapasitasPenumpang` on the `tebengan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tebengan` DROP COLUMN `kapasitasPenumpang`,
    ADD COLUMN `jumlahPenumpang` INTEGER NULL;
