/*
  Warnings:

  - You are about to drop the column `status` on the `booking` table. All the data in the column will be lost.
  - You are about to alter the column `harga` on the `tebengan` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `booking` DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `tebengan` MODIFY `harga` DOUBLE NOT NULL;
