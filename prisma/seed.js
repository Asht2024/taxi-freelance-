import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding LocalBooking table...");

    // Fetch required data
    const allCars = await prisma.car.findMany();
    const allLocations = await prisma.locationInfo.findMany();
    const allFixedPrices = await prisma.fixedPrice.findMany();

    // Ensure we have enough data
    if (allCars.length < 4 || allLocations.length < 4 || allFixedPrices.length < 10) {
        console.error("🚨 Not enough data in Car, LocationInfo, or FixedPrice tables. Please seed them first!");
        return;
    }

    // Define LocalBooking data
    const localBookingsData = [
        { car_id: allCars[0].id, location_id: allLocations[0].id, fixed_price_id: allFixedPrices[0].id },
        { car_id: allCars[1].id, location_id: allLocations[0].id, fixed_price_id: allFixedPrices[1].id },
        { car_id: allCars[2].id, location_id: allLocations[0].id, fixed_price_id: allFixedPrices[2].id },
        { car_id: allCars[3].id, location_id: allLocations[0].id, fixed_price_id: allFixedPrices[3].id },
        
        { car_id: allCars[0].id, location_id: allLocations[1].id, fixed_price_id: allFixedPrices[4].id },
        { car_id: allCars[1].id, location_id: allLocations[1].id, fixed_price_id: allFixedPrices[5].id },
        { car_id: allCars[2].id, location_id: allLocations[1].id, fixed_price_id: allFixedPrices[6].id },
        { car_id: allCars[3].id, location_id: allLocations[1].id, fixed_price_id: allFixedPrices[7].id },
        
        { car_id: allCars[0].id, location_id: allLocations[2].id, fixed_price_id: allFixedPrices[8].id },
        { car_id: allCars[1].id, location_id: allLocations[2].id, fixed_price_id: allFixedPrices[9].id },
        { car_id: allCars[2].id, location_id: allLocations[2].id, fixed_price_id: allFixedPrices[6].id },
        { car_id: allCars[3].id, location_id: allLocations[2].id, fixed_price_id: allFixedPrices[7].id },

        { car_id: allCars[0].id, location_id: allLocations[3].id, fixed_price_id: allFixedPrices[8].id },
        { car_id: allCars[1].id, location_id: allLocations[3].id, fixed_price_id: allFixedPrices[9].id }
    ];

    // Insert LocalBooking data
    await prisma.localBooking.createMany({ data: localBookingsData });

    console.log("✅ LocalBooking table seeded successfully!");
}

  
  
  

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
