/*
  Warnings:

  - You are about to drop the column `carId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FixedPrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LocalBooking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LocationInfo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `carName` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_carId_fkey";

-- DropForeignKey
ALTER TABLE "FixedPrice" DROP CONSTRAINT "FixedPrice_car_id_fkey";

-- DropForeignKey
ALTER TABLE "FixedPrice" DROP CONSTRAINT "FixedPrice_location_id_fkey";

-- DropForeignKey
ALTER TABLE "LocalBooking" DROP CONSTRAINT "LocalBooking_car_id_fkey";

-- DropForeignKey
ALTER TABLE "LocalBooking" DROP CONSTRAINT "LocalBooking_fixed_price_id_fkey";

-- DropForeignKey
ALTER TABLE "LocalBooking" DROP CONSTRAINT "LocalBooking_location_id_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "carId",
ADD COLUMN     "carName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Car";

-- DropTable
DROP TABLE "FixedPrice";

-- DropTable
DROP TABLE "LocalBooking";

-- DropTable
DROP TABLE "LocationInfo";
