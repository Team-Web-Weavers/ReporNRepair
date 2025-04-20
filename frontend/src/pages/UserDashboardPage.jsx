
import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiClock, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const UserDashboardPage = () => {
  const { userid } = useParams();
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // For demo purposes, we'll use mock data
  // In a real app, you would fetch this from your API
  useEffect(() => {
    // Simulate API call
    const fetchReports = async () => {
      try {
        // Mock data - replace with actual API call
        const mockReports = [
          {
            id: 1,
            title: 'Road Damage',
            description: 'Large pothole on Main Street',
            location: '123 Main St',
            status: 'approved',
            date: '2024-04-15',
            comments: 'Repair scheduled for next week'
          },
          {
            id: 2,
            title: 'Streetlight Issue',
            description: 'Flickering streetlight near park',
            location: 'Central Park Area',
            status: 'pending',
            date: '2024-04-17',
            comments: 'Under review'
          },
          {
            id: 3,
            title: 'Illegal Dumping',
            description: 'Trash dumped near river',
            location: 'River Road',
            status: 'rejected',
            date: '2024-04-16',
            comments: 'Location not under city jurisdiction'
          }
        ];

        setReports(mockReports);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FiCheck className="text-green-500" size={20} />;
      case 'rejected':
        return <FiX className="text-red-500" size={20} />;
      default:
        return <FiClock className="text-yellow-500" size={20} />;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Reports</h1>
          <div className="text-sm text-gray-600">
            Total Reports: {reports.length}
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-8">
            <FiAlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">No reports found</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {reports.map((report) => (
              <div
                key={report.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {report.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{report.location}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(report.status)}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadgeClass(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-2">{report.description}</p>
                
                <div className="mt-4 flex justify-between items-center text-sm">
                  <div className="text-gray-500">
                    Reported on: {new Date(report.date).toLocaleDateString()}
                  </div>
                  {report.comments && (
                    <div className="text-gray-600 italic">
                      "{report.comments}"
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[
            {
              status: 'approved',
              label: 'Approved',
              color: 'bg-green-100 text-green-800'
            },
            {
              status: 'pending',
              label: 'Pending',
              color: 'bg-yellow-100 text-yellow-800'
            },
            {
              status: 'rejected',
              label: 'Rejected',
              color: 'bg-red-100 text-red-800'
            }
          ].map((item) => (
            <div
              key={item.status}
              className={`${item.color} rounded-lg p-4 text-center`}
            >
              <div className="text-2xl font-bold mb-1">
                {reports.filter((r) => r.status === item.status).length}
              </div>
              <div className="text-sm">{item.label} Reports</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;