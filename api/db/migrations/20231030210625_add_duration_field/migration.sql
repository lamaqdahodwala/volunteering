-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "managerId" INTEGER NOT NULL,
    "max_signups" INTEGER NOT NULL,
    "minimum_age" INTEGER NOT NULL,
    "datetime" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Job_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("datetime", "description", "id", "managerId", "max_signups", "minimum_age", "title") SELECT "datetime", "description", "id", "managerId", "max_signups", "minimum_age", "title" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
