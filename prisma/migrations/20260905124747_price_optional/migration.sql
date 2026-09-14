-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "serviceSlug" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "notes" TEXT,
    "price" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("branch", "category", "createdAt", "customerId", "date", "id", "notes", "paymentStatus", "price", "serviceName", "serviceSlug", "status", "time", "updatedAt") SELECT "branch", "category", "createdAt", "customerId", "date", "id", "notes", "paymentStatus", "price", "serviceName", "serviceSlug", "status", "time", "updatedAt" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE INDEX "Booking_customerId_idx" ON "Booking"("customerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
