/*
  Warnings:

  - You are about to drop the `_SportToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_SportToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SportsOnUsers" (
    "userId" TEXT NOT NULL,
    "sportId" TEXT NOT NULL,
    "assingnedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusActive" BOOLEAN NOT NULL DEFAULT true,
    "deactivatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("userId", "sportId"),
    CONSTRAINT "SportsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SportsOnUsers_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
