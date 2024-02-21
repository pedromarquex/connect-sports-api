/*
  Warnings:

  - The primary key for the `SportsOnUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SportsOnUsers" (
    "userId" TEXT NOT NULL,
    "sportId" TEXT NOT NULL,
    "assingnedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusActive" BOOLEAN NOT NULL DEFAULT true,
    "deactivatedAt" DATETIME NOT NULL,
    CONSTRAINT "SportsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SportsOnUsers_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SportsOnUsers" ("assingnedAt", "deactivatedAt", "sportId", "statusActive", "userId") SELECT "assingnedAt", "deactivatedAt", "sportId", "statusActive", "userId" FROM "SportsOnUsers";
DROP TABLE "SportsOnUsers";
ALTER TABLE "new_SportsOnUsers" RENAME TO "SportsOnUsers";
CREATE UNIQUE INDEX "SportsOnUsers_userId_sportId_key" ON "SportsOnUsers"("userId", "sportId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
