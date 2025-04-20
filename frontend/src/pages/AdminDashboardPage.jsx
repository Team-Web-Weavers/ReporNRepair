import React, { useEffect, useState } from "react";
import { MdReportProblem } from "react-icons/md";
import { HiXCircle, HiCheckCircle } from "react-icons/hi";
import { FiAlertCircle, FiClock, FiCheckCircle as FiCheck } from "react-icons/fi";


const AdminDashboardPage = () => {
  // Mock data for demonstration
  const mockIssues = [
    {
      _id: "1",
      title: "Road Damage",
      description: "Large pothole on Main Street causing traffic hazards",
      location: "123 Main Street, Near City Park",
      status: "pending",
      priority: "normal",
      date: "2025-04-20",
      reporter: {
        name: "John Doe",
        contact: "+1234567890"
      }
    },
    {
      _id: "2",
      title: "Street Light Malfunction",
      description: "Multiple street lights not working in residential area",
      location: "Green Avenue, Block B",
      status: "pending",
      priority: "normal",
      date: "2025-04-19",
      reporter: {
        name: "Jane Smith",
        contact: "jane@email.com"
      }
    },
    {
      _id: "3",
      title: "Fire Hazard",
      description: "Exposed electrical wires near public park",
      location: "Central Park, East Entrance",
      status: "pending",
      priority: "emergency",
      date: "2025-04-20",
      reporter: {
        name: "Mike Wilson",
        contact: "+1987654321"
      }
    }
  ];

  const mockWorkers = [
    { id: "W1", name: "Alex Johnson", expertise: "Road Works" },
    { id: "W2", name: "Sarah Williams", expertise: "Electrical" },
    { id: "W3", name: "Mike Brown", expertise: "General Maintenance" }
  ];


  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedWorker, setSelectedWorker] = useState('');
  const [assignedIssues, setAssignedIssues] = useState([]);


  const filteredIssues = issues.filter(issue => {
    if (priorityFilter === 'all') return true;
    return issue.priority === priorityFilter;
  });

  const handleAssignWorker = async (issueId) => {
    if (!selectedWorker) {
      alert('Please select a worker first');
      return;
    }
  
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update issues list
      setIssues(prev => prev.filter(issue => issue._id !== issueId));
      
      // Add to assigned issues
      setAssignedIssues(prev => [...prev, {
        issueId,
        workerId: selectedWorker,
        status: 'assigned'
      }]);
      
      setSelectedWorker('');
    } catch (error) {
      console.error("Error assigning worker:", error);
    } finally {
      setLoading(false);
    }
  };

  // Simulate API fetch
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIssues(mockIssues);
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const handleAction = async (id, action) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (action === "rejected") {
        // Remove the issue if rejected
        setIssues(prev => prev.filter(issue => issue._id !== id));
      } else {
        // Update status if approved
        setIssues(prev => prev.map(issue => 
          issue._id === id 
            ? { ...issue, status: action }
            : issue
        ));
      }
    } catch (error) {
      console.error("Error updating issue status:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAISuggestion = (desc) => {
    desc = desc.toLowerCase();
    if (desc.includes("fire") || desc.includes("hazard"))
      return "⚠️ Emergency issue. Immediate action required.";
    if (desc.includes("pothole"))
      return "🛣️ Road safety issue. Priority response recommended.";
    if (desc.includes("light"))
      return "💡 Infrastructure issue. Schedule maintenance.";
    return "ℹ️ Standard review required.";
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'emergency':
        return 'bg-red-100 text-red-800';
      case 'normal':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <select 
                className="border rounded-md px-3 py-2 text-gray-700"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Issues</option>
                <option value="emergency">Emergency</option>
                <option value="normal">Normal Priority</option>
              </select>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { 
                label: 'Total Issues', 
                value: filteredIssues.length, 
                icon: <MdReportProblem />, 
                color: 'bg-blue-500' 
              },
              { 
                label: 'Emergency', 
                value: filteredIssues.filter(i => i.priority === 'emergency').length, 
                icon: <FiAlertCircle />, 
                color: 'bg-red-500' 
              },
              { 
                label: 'Normal Priority', 
                value: filteredIssues.filter(i => i.priority === 'normal').length, 
                icon: <FiClock />, 
                color: 'bg-orange-500' 
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

          {/* Issues List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 h-40 rounded-lg"></div>
              ))}
            </div>
          ) : filteredIssues.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <FiCheck className="mx-auto text-green-500 text-4xl mb-2" />
              <p className="text-lg text-green-700">
                {priorityFilter === 'all' ? 'No issues found' : `No ${priorityFilter} priority issues found`}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredIssues.map((issue) => (
                <div
                  key={issue._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <MdReportProblem className="text-yellow-500" />
                      {issue.title}
                    </h2>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          issue.status === 'approved' ? 'bg-green-100 text-green-800' :
                          issue.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {issue.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityClass(issue.priority)}`}>
                          {issue.priority}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{issue.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        📍 <span className="font-medium">Location:</span> {issue.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        👤 <span className="font-medium">Reporter:</span> {issue.reporter.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        📅 <span className="font-medium">Date:</span> {issue.date}
                      </p>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                      <p className="text-sm text-blue-700">
                        <span className="font-bold">AI Suggestion:</span>{" "}
                        {getAISuggestion(issue.description)}
                      </p>
                    </div>

                    <div className="flex justify-end space-x-3">
                      {issue.status === 'approved' ? (
                        <div className="flex space-x-3">
                          <select
                            value={selectedWorker}
                            onChange={(e) => setSelectedWorker(e.target.value)}
                            className="border rounded-md px-3 py-2 text-gray-700"
                          >
                            <option value="">Select Worker</option>
                            {mockWorkers.map(worker => (
                              <option key={worker.id} value={worker.id}>
                                {worker.name} - {worker.expertise}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleAssignWorker(issue._id)}
                            className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors flex items-center gap-2"
                            disabled={loading}
                          >
                            <FiCheck /> Assign & Forward
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleAction(issue._id, "approved")}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
                            disabled={loading}
                          >
                            <HiCheckCircle /> Approve
                          </button>
                          <button
                            onClick={() => handleAction(issue._id, "rejected")}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
                            disabled={loading}
                          >
                            <HiXCircle /> Reject
                          </button>
                        </>
                      )}
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

export default AdminDashboardPage;