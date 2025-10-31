-- AlterTable
ALTER TABLE `payment` ADD COLUMN `tebenganId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_tebenganId_fkey` FOREIGN KEY (`tebenganId`) REFERENCES `Tebengan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
