/*
  Warnings:

  - You are about to drop the column `district_id` on the `terminal` table. All the data in the column will be lost.
  - You are about to drop the column `province_id` on the `terminal` table. All the data in the column will be lost.
  - You are about to drop the column `regency_id` on the `terminal` table. All the data in the column will be lost.
  - You are about to drop the `district` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `province` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `regency` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `district_name` to the `Terminal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province_name` to the `Terminal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regency_name` to the `Terminal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `district` DROP FOREIGN KEY `District_regency_id_fkey`;

-- DropForeignKey
ALTER TABLE `regency` DROP FOREIGN KEY `Regency_province_id_fkey`;

-- DropForeignKey
ALTER TABLE `terminal` DROP FOREIGN KEY `Terminal_district_id_fkey`;

-- DropForeignKey
ALTER TABLE `terminal` DROP FOREIGN KEY `Terminal_province_id_fkey`;

-- DropForeignKey
ALTER TABLE `terminal` DROP FOREIGN KEY `Terminal_regency_id_fkey`;

-- DropIndex
DROP INDEX `Terminal_district_id_fkey` ON `terminal`;

-- DropIndex
DROP INDEX `Terminal_province_id_fkey` ON `terminal`;

-- DropIndex
DROP INDEX `Terminal_regency_id_fkey` ON `terminal`;

-- AlterTable
ALTER TABLE `terminal` DROP COLUMN `district_id`,
    DROP COLUMN `province_id`,
    DROP COLUMN `regency_id`,
    ADD COLUMN `district_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `province_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `regency_name` VARCHAR(191) NOT NULL,
    MODIFY `latitude` VARCHAR(191) NULL,
    MODIFY `longitude` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `district`;

-- DropTable
DROP TABLE `province`;

-- DropTable
DROP TABLE `regency`;
