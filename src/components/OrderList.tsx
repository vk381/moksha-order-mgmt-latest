import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ClipboardList, Eye, PlusCircle } from 'lucide-react';

// Mock data for orders
const mockOrders = [
  { id: 1, customerName: 'John Doe', phoneNumber: '123-456-7890', status: 'In Progress', items: [
    { description: 'Item 1', images: ['https://source.unsplash.com/random/800x600?sig=1'], status: 'In Progress' },
    { description: 'Item 2', images: ['https://source.unsplash.com/random/800x600?sig=2'], status: 'Completed' },
  ]},
  { id: 2, customerName: 'Jane Smith', phoneNumber: '098-765-4321', status: 'Pending', items: [
    { description: 'Item 3', images: ['https://source.unsplash.com/random/800x600?sig=3'], status: 'Pending' },
  ]},
  { id: 3, customerName: 'Bob Johnson', phoneNumber: '555-555-5555', status: 'Completed', items: [
    { description: 'Item 4', images: ['https://source.unsplash.com/random/800x600?sig=4'], status: 'Completed' },
    { description: 'Item 5', images: ['https://source.unsplash.com/random/800x600?sig=5'], status: 'Completed' },
  ]},
];

const OrderList: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedOrder, setSelectedOrder] = React.useState<typeof mockOrders[0] | null>(null);

  const handleViewDetails = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
  };

  const closeDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <ClipboardList className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">Order List</span>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
            {user?.role === 'SuperAdmin' && (
              <button
                onClick={() => navigate('/new-order')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                New Order
              </button>
            )}
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {mockOrders.map((order) => (
                <li key={order.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {order.customerName}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {order.phoneNumber}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center"
                        >
                          <Eye className="h-5 w-5 mr-1" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={closeDetails}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedOrder.customerName}</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Phone: {selectedOrder.phoneNumber}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Status: {selectedOrder.status}
                </p>
                <div className="mt-4">
                  <h4 className="text-md font-medium text-gray-700">Order Items:</h4>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="mt-2 border-t pt-2">
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-xs text-gray-500">Status: {item.status}</p>
                      <img src={item.images[0]} alt="Item" className="mt-2 w-full h-32 object-cover rounded" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={closeDetails}
                  className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;