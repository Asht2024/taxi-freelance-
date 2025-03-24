"use client";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading users...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">All Users</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white text-left text-sm shadow-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2">Avatar</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Joined At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {user.image ? (
                      <img src={user.image} alt="User Avatar" className="h-10 w-10 rounded-full" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">{user.name || "N/A"}</td>
                  <td className="px-4 py-2">{user.email || "N/A"}</td>
                  <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
