"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Session } from "next-auth";
import BookingCard from "../../../components/BookingCard";

interface TripData {
  date: string;
  time: string;
  carType: string;
  distance: string;
  pickupLocation: string;
  dropoffLocation: string;
}


interface Booking {
id: string;
carName: string;
amount: number;
paymentStatus: string;
createdAt: string;
updatedAt: string;
tripData: TripData;
costomername?: string;
costomemail?: string;
costomercontact?: string;
paid?: number;
}


export default function UserProfilePage() {
  const { data: session, status } = useSession() as {
    data: Session | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (session?.user?.email) {
        try {
          const response = await axios.get(`/api/bookings?email=${session.user.email}`);
          setBookings(response.data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookings();
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session || !session.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please login to view your profile</h1>
          <button
            onClick={() => signIn()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-14 py-8 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto">
        

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking History</h2>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No bookings found</div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
  <BookingCard
    key={booking.id}
    booking={{
      id: booking.id,
      carName: booking.carName,
      amount: booking.amount,
      paymentStatus: booking.paymentStatus,
      createdAt: booking.createdAt,
      tripType: booking.tripData.carType || "N/A",
      pickupAddress: booking.tripData?.pickupLocation || "N/A",
      dropAddress: booking.tripData?.dropoffLocation || "",
      costomername: booking.costomername,
      costomemail: booking.costomemail,
      costomercontact: booking.costomercontact,
      paid: booking.paid || 0,
    }}
  />
))}
          </div>
        )}
      </div>
    </div>
  );
}

