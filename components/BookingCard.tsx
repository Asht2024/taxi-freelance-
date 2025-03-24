interface BookingCardProps {
  booking: {
    id: string;
    carName: string;
    amount: number;
    paymentStatus: string;
    createdAt: string;
    tripType: string;
    pickupAddress: string;
    dropAddress?: string;
  };
}

export default function BookingCard({ booking }: BookingCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-start gap-6">
      
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{booking.carName}</h3>
        <p className="text-sm text-gray-600">Trip Type: {booking.tripType}</p>
        <p className="text-sm text-gray-500">Amount: ₹{booking.amount}</p>
        <p
          className={`text-sm font-medium ${
            booking.paymentStatus === "SUCCESS" ? "text-green-600" : "text-red-500"
          }`}
        >
          {booking.paymentStatus}
        </p>

        <div className="mt-2">
          <p className="text-sm">
            <strong>Pickup:</strong> {booking.pickupAddress}
          </p>
          {booking.dropAddress && (
            <p className="text-sm">
              <strong>Drop:</strong> {booking.dropAddress}
            </p>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-2">
          Booked on: {new Date(booking.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
