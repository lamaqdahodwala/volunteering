/*
  Warnings:

  - You are about to drop the column `time` on the `Job` table. All the data in the column will be lost.
  - Added the required column `datetime` to the `Job` table without a default value. This is not possible if the table is not empty.

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
    "datetime" DATETIME NOT NULL,
    CONSTRAINT "Job_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("description", "id", "managerId", "max_signups", "minimum_age", "title") SELECT "description", "id", "managerId", "max_signups", "minimum_age", "title" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
