/*
  Warnings:

  - You are about to drop the column `endereco` on the `Franquia` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Franquia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "pais" TEXT NOT NULL DEFAULT 'Coreia do Sul',
    "telefone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Franquia" ("cidade", "createdAt", "id", "nome", "telefone", "updatedAt") SELECT "cidade", "createdAt", "id", "nome", "telefone", "updatedAt" FROM "Franquia";
DROP TABLE "Franquia";
ALTER TABLE "new_Franquia" RENAME TO "Franquia";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
