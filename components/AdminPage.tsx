import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface AdminPageProps {
  onSetPassword: (password: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onSetPassword }) => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from('orders').select('amount');

      if (error) {
        setError(error.message);
      } else {
        const total = data.reduce((acc, order) => acc + order.amount, 0);
        setTotalSales(total);
        setTotalOrders(data.length);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    onSetPassword(newPassword);
    setNewPassword('');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Total Sales</h2>
          <p className="text-4xl font-bold">ZAR {totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Total Orders</h2>
          <p className="text-4xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Top Selling Product</h2>
          <p className="text-4xl font-bold">-</p>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="flex items-center">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
