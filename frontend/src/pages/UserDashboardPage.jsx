import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiClock, FiAlertCircle, FiMapPin, FiFileText, FiMoreVertical } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const UserDashboardPage = () => {
  const { userid } = useParams();
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');


  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true;
    return report.status === filter;
  });

  // Enhanced mock data
  const mockReports = [
    {
      id: 1,
      title: 'Road Damage',
      description: 'Large pothole on Main Street causing traffic hazards. Multiple vehicles have reported damage.',
      location: '123 Main St, Near Central Market',
      status: 'approved',
      priority: 'high',
      date: '2024-04-15',
      comments: 'Repair scheduled for next week',
      category: 'Infrastructure'
    },
    {
      id: 2,
      title: 'Streetlight Issue',
      description: 'Three consecutive streetlights not working in residential area, causing safety concerns.',
      location: 'Central Park Area, Block B',
      status: 'pending',
      priority: 'medium',
      date: '2024-04-17',
      comments: 'Under review by maintenance team',
      category: 'Public Safety'
    },
    {
      id: 3,
      title: 'Illegal Dumping',
      description: 'Large amount of construction waste dumped near river bank.',
      location: 'River Road, Behind Shopping Complex',
      status: 'rejected',
      priority: 'low',
      date: '2024-04-16',
      comments: 'Location not under city jurisdiction',
      category: 'Environmental'
    }
  ];

  useEffect(() => {
    const fetchReports = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setReports(mockReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">My Reports</h1>
              <p className="text-gray-600">Track and manage your submitted reports</p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border rounded-md px-3 py-2 text-gray-700 focus:ring-sky-500 focus:border-sky-500"
              >
                <option value="all">All Reports</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { 
                label: 'Total Reports',
                value: reports.length,
                icon: <FiFileText />,
                color: 'bg-sky-500'
              },
              {
                label: 'Approved',
                value: reports.filter(r => r.status === 'approved').length,
                icon: <FiCheck />,
                color: 'bg-green-500'
              },
              {
                label: 'Pending',
                value: reports.filter(r => r.status === 'pending').length,
                icon: <FiClock />,
                color: 'bg-yellow-500'
              },
              {
                label: 'Rejected',
                value: reports.filter(r => r.status === 'rejected').length,
                icon: <FiX />,
                color: 'bg-red-500'
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className={`inline-flex items-center justify-center p-3 rounded-full ${stat.color} text-white mb-4`}>
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-700">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Reports List */}
          {filteredReports.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <FiAlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">
                {filter === 'all' ? 'No reports found' : `No ${filter} reports found`}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-1 gap-6">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <FiMapPin className="text-sky-500" />
                        {report.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadgeClass(report.status)}`}>
                        {report.status}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{report.description}</p>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        📍 <span className="font-medium">Location:</span> {report.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        🏷️ <span className="font-medium">Category:</span> {report.category}
                      </p>
                      <p className="text-sm text-gray-600">
                        📅 <span className="font-medium">Reported:</span> {new Date(report.date).toLocaleDateString()}
                      </p>
                    </div>

                    {report.comments && (
                      <div className="bg-gray-50 border-l-4 border-sky-500 p-4 mt-4">
                        <p className="text-sm text-gray-700">
                          <span className="font-bold">Status Update:</span>{" "}
                          {report.comments}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;