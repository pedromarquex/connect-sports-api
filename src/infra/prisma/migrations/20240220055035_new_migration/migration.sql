/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Place" ADD COLUMN "neighborhood" TEXT;
ALTER TABLE "Place" ADD COLUMN "number" INTEGER;
ALTER TABLE "Place" ADD COLUMN "street" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Address";
PRAGMA foreign_keys=on;
