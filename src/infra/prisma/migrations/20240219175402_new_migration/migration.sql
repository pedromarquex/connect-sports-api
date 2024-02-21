/*
  Warnings:

  - You are about to drop the column `deactivatedAt` on the `SportsOnUsers` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SportsOnUsers" (
    "userId" TEXT NOT NULL,
    "sportId" TEXT NOT NULL,
    "assingnedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusActive" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("userId", "sportId")
);
INSERT INTO "new_SportsOnUsers" ("assingnedAt", "sportId", "statusActive", "userId") SELECT "assingnedAt", "sportId", "statusActive", "userId" FROM "SportsOnUsers";
DROP TABLE "SportsOnUsers";
ALTER TABLE "new_SportsOnUsers" RENAME TO "SportsOnUsers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
