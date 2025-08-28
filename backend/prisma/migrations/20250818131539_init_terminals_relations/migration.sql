/*
  Warnings:

  - Added the required column `district_id` to the `Terminal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_address` to the `Terminal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Terminal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Terminal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province_id` to the `Terminal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regency_id` to the `Terminal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `terminal_type` to the `Terminal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Terminal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `terminal` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `district_id` INTEGER NOT NULL,
    ADD COLUMN `full_address` VARCHAR(191) NOT NULL,
    ADD COLUMN `latitude` VARCHAR(191) NOT NULL,
    ADD COLUMN `longitude` VARCHAR(191) NOT NULL,
    ADD COLUMN `province_id` INTEGER NOT NULL,
    ADD COLUMN `public_terminal_subtype` ENUM('Terminal Bis', 'Stasiun Kereta', 'Bandara', 'Pelabuhan') NULL,
    ADD COLUMN `regency_id` INTEGER NOT NULL,
    ADD COLUMN `terminal_type` ENUM('Public', 'Private') NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Province` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Regency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `province_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `District` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `regency_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Regency` ADD CONSTRAINT `Regency_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `Province`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `District` ADD CONSTRAINT `District_regency_id_fkey` FOREIGN KEY (`regency_id`) REFERENCES `Regency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Terminal` ADD CONSTRAINT `Terminal_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `Province`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Terminal` ADD CONSTRAINT `Terminal_regency_id_fkey` FOREIGN KEY (`regency_id`) REFERENCES `Regency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Terminal` ADD CONSTRAINT `Terminal_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `District`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
