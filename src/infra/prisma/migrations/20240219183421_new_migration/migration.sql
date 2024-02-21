-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "statusActive" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Sport" ("createdAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "description", "id", "name", "updatedAt" FROM "Sport";
DROP TABLE "Sport";
ALTER TABLE "new_Sport" RENAME TO "Sport";
CREATE UNIQUE INDEX "Sport_name_key" ON "Sport"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
