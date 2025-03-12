-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "calculated_price" DROP NOT NULL;

-- CreateTable
CREATE TABLE "LocationInfo" (
    "id" SERIAL NOT NULL,
    "location_name" VARCHAR(200) NOT NULL,

    CONSTRAINT "LocationInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalBooking" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "LocalBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FixedPrice" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "car_id" INTEGER NOT NULL,
    "prices" VARCHAR(200) NOT NULL,

    CONSTRAINT "FixedPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LocalBooking_car_id_key" ON "LocalBooking"("car_id");

-- CreateIndex
CREATE UNIQUE INDEX "LocalBooking_location_id_key" ON "LocalBooking"("location_id");

-- AddForeignKey
ALTER TABLE "LocalBooking" ADD CONSTRAINT "LocalBooking_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalBooking" ADD CONSTRAINT "LocalBooking_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "LocationInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedPrice" ADD CONSTRAINT "FixedPrice_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "LocationInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedPrice" ADD CONSTRAINT "FixedPrice_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;
