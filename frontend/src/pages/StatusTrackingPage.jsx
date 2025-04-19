const StatusTrackingPage = () => {
    return (
      <div className="bg-gray-100 py-12 text-gray-600">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">Track Your Report</h1>
            
            <div className="max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Enter your report ID"
                className="w-full px-4 py-2 border rounded-md mb-4"
              />
              
              {/* Status timeline */}
              <div className="relative">
                {/* Add timeline steps */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default StatusTrackingPage;