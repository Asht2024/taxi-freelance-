-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "image_url" VARCHAR(200) NOT NULL,
    "car_name" VARCHAR(100) NOT NULL,
    "local_price_per_km" INTEGER NOT NULL,
    "local_min_price" INTEGER NOT NULL,
    "rental_price" VARCHAR(200) NOT NULL,
    "outstation_per_km" INTEGER NOT NULL,
    "outstation_min" INTEGER NOT NULL,
    "luggage" INTEGER NOT NULL,
    "passenger" INTEGER NOT NULL,
    "calculated_price" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);
