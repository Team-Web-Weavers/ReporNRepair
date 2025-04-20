import { useState, useEffect } from 'react';
import { FiCheck, FiClock, FiTool } from 'react-icons/fi';

const WorkerDashboardPage = () => {
  // Mock assigned tasks
  const mockAssignedTasks = [
    {
      _id: "1",
      title: "Road Damage",
      description: "Large pothole on Main Street causing traffic hazards",
      location: "123 Main Street, Near City Park",
      status: "assigned",
      priority: "normal",
      date: "2025-04-20",
      reporter: {
        name: "John Doe",
        contact: "+1234567890"
      },
      assignedDate: "2025-04-21"
    },
    {
      _id: "2",
      title: "Street Light Malfunction",
      description: "Multiple street lights not working in residential area",
      location: "Green Avenue, Block B",
      status: "in_progress",
      priority: "normal",
      date: "2025-04-19",
      reporter: {
        name: "Jane Smith",
        contact: "jane@email.com"
      },
      assignedDate: "2025-04-20"
    }
  ];

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTasks(mockAssignedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleComplete = async (taskId) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Error completing task:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Worker Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your assigned tasks</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="border rounded-md px-3 py-2 text-gray-700"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Tasks</option>
                <option value="assigned">New Tasks</option>
                <option value="in_progress">In Progress</option>
              </select>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                label: 'Total Tasks',
                value: tasks.length,
                icon: <FiTool />,
                color: 'bg-sky-500'
              },
              {
                label: 'New Tasks',
                value: tasks.filter(t => t.status === 'assigned').length,
                icon: <FiClock />,
                color: 'bg-yellow-500'
              },
              {
                label: 'In Progress',
                value: tasks.filter(t => t.status === 'in_progress').length,
                icon: <FiCheck />,
                color: 'bg-green-500'
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

          {/* Tasks List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 h-40 rounded-lg"></div>
              ))}
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <FiCheck className="mx-auto text-green-500 text-4xl mb-2" />
              <p className="text-lg text-green-700">All tasks completed!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-1 gap-6">
              {filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <FiTool className="text-sky-500" />
                        {task.title}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        task.status === 'assigned' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {task.status === 'assigned' ? 'New Task' : 'In Progress'}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{task.description}</p>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        📍 <span className="font-medium">Location:</span> {task.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        📅 <span className="font-medium">Reported:</span> {task.date}
                      </p>
                      <p className="text-sm text-gray-600">
                        ⏰ <span className="font-medium">Assigned:</span> {task.assignedDate}
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleComplete(task._id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
                        disabled={loading}
                      >
                        <FiCheck /> Mark as Complete
                      </button>
                    </div>
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

export default WorkerDashboardPage;