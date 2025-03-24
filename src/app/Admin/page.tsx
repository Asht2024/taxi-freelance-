"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Admin() {
  const session = useSession();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalEarnings: 0,
  });
  const router = useRouter();
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen mt-10 p-8">
      {/* Admin Profile Section */}
      <div className="mb-8 flex items-center justify-between rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-center space-x-4">
          {session.data?.user.image && (
            <img
              src={session.data?.user.image}
              alt="Admin Profile"
              className="h-12 w-12 rounded-full"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {session.data?.user?.name}
            </h1>
            <p className="text-gray-600">{session.data?.user?.email}</p>
          </div>
        </div>
        <span className="rounded bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
          Admin
        </span>
      </div>

      {/* Stats Grid */}
      <div  className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Users Card */}
        <div onClick={()=>{router.push("/users")}} className="transform rounded-lg bg-blue-600 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold">{stats.totalUsers}</p>
              <p className="mt-2">Total Users</p>
            </div>
          </div>
        </div>

        {/* Bookings Card */}
        <div onClick={()=>{router.push("/bookings")}} className="transform rounded-lg bg-green-600 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold">{stats.totalBookings}</p>
              <p className="mt-2">Total Bookings</p>
            </div>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="transform rounded-lg bg-purple-600 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold">₹{stats.totalEarnings.toFixed(2)}</p>
              <p className="mt-2">Total Earnings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
