/*
  Warnings:

  - The values [Motor,Mobil] on the enum `PassengerPricing_vehicle_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `price_per_seat` on the `passengerpricing` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `commission_percentage` on the `passengerpricing` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `passengerpricing` MODIFY `vehicle_type` ENUM('Car', 'Motorbike', 'Bus', 'Train') NOT NULL,
    MODIFY `price_per_seat` DOUBLE NOT NULL,
    MODIFY `commission_percentage` DOUBLE NOT NULL;
