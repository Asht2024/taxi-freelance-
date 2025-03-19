export default function BookingCard({ booking }: { booking: any }) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{booking.carDetails.car_name}</h3>
            <p className="text-gray-600">{booking.carDetails.model}</p>
            <p className="text-sm text-gray-500">
              {new Date(booking.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className={`text-lg font-bold ${
              booking.paymentStatus === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              ₹{booking.amount / 100}
            </p>
            <p className="text-sm capitalize">{booking.paymentStatus}</p>
          </div>
        </div>
      </div>
    );
  }