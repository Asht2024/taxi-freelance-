/*
  Warnings:

  - Added the required column `fixed_price_id` to the `LocalBooking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LocalBooking" DROP CONSTRAINT "LocalBooking_car_id_fkey";

-- DropForeignKey
ALTER TABLE "LocalBooking" DROP CONSTRAINT "LocalBooking_location_id_fkey";

-- DropIndex
DROP INDEX "LocalBooking_car_id_key";

-- DropIndex
DROP INDEX "LocalBooking_location_id_key";

-- AlterTable
ALTER TABLE "LocalBooking" ADD COLUMN     "fixed_price_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LocalBooking" ADD CONSTRAINT "LocalBooking_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalBooking" ADD CONSTRAINT "LocalBooking_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "LocationInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalBooking" ADD CONSTRAINT "LocalBooking_fixed_price_id_fkey" FOREIGN KEY ("fixed_price_id") REFERENCES "FixedPrice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
