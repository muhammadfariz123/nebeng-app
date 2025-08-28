-- CreateTable
CREATE TABLE `GoodsPricing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transport_type` ENUM('Sendiri', 'Umum') NOT NULL,
    `departure_terminal_id` INTEGER NOT NULL,
    `arrival_terminal_id` INTEGER NOT NULL,
    `price_per_kg` DOUBLE NOT NULL,
    `commission_percentage` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GoodsPricing` ADD CONSTRAINT `GoodsPricing_departure_terminal_id_fkey` FOREIGN KEY (`departure_terminal_id`) REFERENCES `Terminal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GoodsPricing` ADD CONSTRAINT `GoodsPricing_arrival_terminal_id_fkey` FOREIGN KEY (`arrival_terminal_id`) REFERENCES `Terminal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
