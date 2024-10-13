import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ClipboardList, PlusCircle, Users, BarChart2, TrendingUp, Clock } from 'lucide-react';

// Mock data for analytics
const analytics = {
  totalOrders: 150,
  completedOrders: 120,
  pendingOrders: 30,
  averageCompletionTime: '2 days',
};

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <ClipboardList className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">Order Management</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Welcome, {user?.name} ({user?.role})</span>
              <button
                onClick={logout}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
          
          {/* Analytics Section */}
          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <BarChart2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                      <dd className="text-lg font-semibold text-gray-900">{analytics.totalOrders}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Completed Orders</dt>
                      <dd className="text-lg font-semibold text-gray-900">{analytics.completedOrders}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Pending Orders</dt>
                      <dd className="text-lg font-semibold text-gray-900">{analytics.pendingOrders}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Avg. Completion Time</dt>
                      <dd className="text-lg font-semibold text-gray-900">{analytics.averageCompletionTime}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Actions */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {user?.role === 'SuperAdmin' && (
              <Link
                to="/new-order"
                className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md transition-shadow duration-300 ease-in-out"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <PlusCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Create New Order</dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">Start here</dd>
                    </dl>
                  </div>
                </div>
              </Link>
            )}
            <Link
              to="/orders"
              className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md transition-shadow duration-300 ease-in-out"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <ClipboardList className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">View Orders</dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900">Manage existing orders</dd>
                  </dl>
                </div>
              </div>
            </Link>
            {user?.role === 'SuperAdmin' && (
              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Manage Users</dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">Coming soon</dd>
                    </dl>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;