/*
  Warnings:

  - You are about to drop the column `userId` on the `Sport` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_PlaceToSport" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PlaceToSport_A_fkey" FOREIGN KEY ("A") REFERENCES "Place" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PlaceToSport_B_fkey" FOREIGN KEY ("B") REFERENCES "Sport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SportToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SportToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Sport" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SportToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Sport" ("description", "id", "name") SELECT "description", "id", "name" FROM "Sport";
DROP TABLE "Sport";
ALTER TABLE "new_Sport" RENAME TO "Sport";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_PlaceToSport_AB_unique" ON "_PlaceToSport"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaceToSport_B_index" ON "_PlaceToSport"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SportToUser_AB_unique" ON "_SportToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SportToUser_B_index" ON "_SportToUser"("B");
