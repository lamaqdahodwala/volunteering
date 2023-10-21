/*
  Warnings:

  - You are about to alter the column `time` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "managerId" INTEGER NOT NULL,
    "max_signups" INTEGER NOT NULL,
    "minimum_age" INTEGER NOT NULL,
    "time" BIGINT NOT NULL,
    CONSTRAINT "Job_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("description", "id", "managerId", "max_signups", "minimum_age", "time", "title") SELECT "description", "id", "managerId", "max_signups", "minimum_age", "time", "title" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
