-- CreateTable
CREATE TABLE `PassengerPricing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vehicle_type` ENUM('Motor', 'Mobil') NOT NULL,
    `departure_terminal_id` INTEGER NOT NULL,
    `arrival_terminal_id` INTEGER NOT NULL,
    `price_per_seat` INTEGER NOT NULL,
    `commission_percentage` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PassengerPricing` ADD CONSTRAINT `PassengerPricing_departure_terminal_id_fkey` FOREIGN KEY (`departure_terminal_id`) REFERENCES `Terminal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PassengerPricing` ADD CONSTRAINT `PassengerPricing_arrival_terminal_id_fkey` FOREIGN KEY (`arrival_terminal_id`) REFERENCES `Terminal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
