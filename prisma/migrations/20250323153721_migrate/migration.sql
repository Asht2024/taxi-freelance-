/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Booking` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Booking_paymentId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "paymentId";
