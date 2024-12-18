/*
  Warnings:

  - Made the column `categoryId` on table `SharedCategory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateForConclusion` on table `TodoList` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SharedCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "SharedCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SharedCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SharedCategory" ("categoryId", "id", "userId") SELECT "categoryId", "id", "userId" FROM "SharedCategory";
DROP TABLE "SharedCategory";
ALTER TABLE "new_SharedCategory" RENAME TO "SharedCategory";
CREATE TABLE "new_TodoList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "concludeAt" DATETIME,
    "dateForConclusion" DATETIME NOT NULL,
    "categoryId" INTEGER,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "TodoList_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TodoList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TodoList" ("categoryId", "concludeAt", "createdAt", "dateForConclusion", "description", "id", "title", "userId") SELECT "categoryId", "concludeAt", "createdAt", "dateForConclusion", "description", "id", "title", "userId" FROM "TodoList";
DROP TABLE "TodoList";
ALTER TABLE "new_TodoList" RENAME TO "TodoList";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
