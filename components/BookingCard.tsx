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
    costomername?: string;
    costomemail?: string;
    costomercontact?: string;
    paid: number;
  };
}

export default function BookingCard({ booking }: BookingCardProps) {
  const remainingAmount = booking.amount - booking.paid;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 border border-gray-100">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{booking.carName}</h3>
          <p className="text-sm text-gray-500">{booking.tripType} Trip</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          booking.paymentStatus === "SUCCESS" 
            ? "bg-green-100 text-green-800" 
            : "bg-yellow-100 text-yellow-800"
        }`}>
          {booking.paymentStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">Customer Details</h4>
          <div className="text-sm text-gray-600">
            <p>{booking.costomername || 'N/A'}</p>
            <p>{booking.costomemail || 'N/A'}</p>
            <p>{booking.costomercontact || 'N/A'}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">Trip Details</h4>
          <div className="text-sm text-gray-600">
            <p><span className="font-medium">Pickup:</span> {booking.pickupAddress}</p>
            {booking.dropAddress && (
              <p><span className="font-medium">Drop:</span> {booking.dropAddress}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="font-medium">₹{booking.amount.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Paid</p>
          <p className="font-medium text-green-600">₹{booking.paid.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Remaining</p>
          <p className={`font-medium ${
            remainingAmount > 0 ? 'text-red-600' : 'text-gray-700'
          }`}>
            ₹{Math.max(remainingAmount, 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-400">
        <p>Booking ID: {booking.id}</p>
        <p>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
