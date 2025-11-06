-- CreateTable
CREATE TABLE `Penumpang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `idType` VARCHAR(191) NOT NULL,
    `idNumber` VARCHAR(191) NOT NULL,
    `tebenganId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Penumpang` ADD CONSTRAINT `Penumpang_tebenganId_fkey` FOREIGN KEY (`tebenganId`) REFERENCES `Tebengan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
