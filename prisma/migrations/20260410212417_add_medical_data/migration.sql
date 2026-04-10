-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'PATIENT',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "specialty" TEXT,
    "licenseNumber" TEXT,
    "experience" INTEGER,
    "bio" TEXT,
    "education" TEXT NOT NULL DEFAULT '[]',
    "image" TEXT,
    "format" TEXT NOT NULL DEFAULT '["chat"]',
    "rating" REAL NOT NULL DEFAULT 5.0,
    "bloodType" TEXT,
    "chronicDiseases" TEXT NOT NULL DEFAULT '[]',
    "allergies" TEXT NOT NULL DEFAULT '[]',
    "medications" TEXT NOT NULL DEFAULT '[]',
    "healthDescription" TEXT
);
INSERT INTO "new_users" ("bio", "createdAt", "education", "email", "experience", "format", "id", "image", "licenseNumber", "name", "password", "rating", "role", "specialty", "status", "updatedAt") SELECT "bio", "createdAt", "education", "email", "experience", "format", "id", "image", "licenseNumber", "name", "password", "rating", "role", "specialty", "status", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
