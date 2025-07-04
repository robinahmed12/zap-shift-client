import { Link } from 'react-router-dom';

const DashboardHome = () => {
  // Mock data for demonstration
  const recentDeliveries = [
    { id: 'DL-12345', status: 'In Transit', date: '2023-06-15', to: 'New York' },
    { id: 'DL-67890', status: 'Delivered', date: '2023-06-10', to: 'Los Angeles' },
    { id: 'DL-54321', status: 'Processing', date: '2023-06-18', to: 'Chicago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>
          Welcome to Your Dashboard
        </h2>
        <p className="text-gray-600">
          Track your parcels, view delivery history, and manage your shipments.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/dashboard/my-parcel"
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="font-bold mb-2" style={{ color: '#E30613' }}>
            Track Parcel
          </h3>
          <p className="text-gray-600 text-sm">Check the status of your current deliveries</p>
        </Link>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold mb-2" style={{ color: '#E30613' }}>
            Schedule Pickup
          </h3>
          <p className="text-gray-600 text-sm">Arrange for a courier to collect your parcel</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold mb-2" style={{ color: '#E30613' }}>
            Delivery History
          </h3>
          <p className="text-gray-600 text-sm">View all your past deliveries and invoices</p>
        </div>
      </div>

      {/* Recent deliveries */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-bold" style={{ color: '#000000' }}>
            Recent Deliveries
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tracking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentDeliveries.map((delivery) => (
                <tr key={delivery.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: '#E30613' }}>
                    {delivery.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        delivery.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : delivery.status === 'In Transit'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{delivery.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{delivery.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-bold mb-2" style={{ color: '#000000' }}>
          Need to send a parcel?
        </h3>
        <p className="text-gray-600 mb-4">Create a new delivery request in just a few clicks</p>
        <button
          className="px-6 py-2 rounded-md font-medium text-white"
          style={{ backgroundColor: '#E30613' }}
        >
          Create New Delivery
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;