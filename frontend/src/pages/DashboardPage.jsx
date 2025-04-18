import React, { useEffect, useState } from "react";
import { MdReportProblem } from "react-icons/md";
import { HiXCircle, HiCheckCircle } from "react-icons/hi";

const DashboardPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch problems from backend
  const fetchIssues = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/issues");
      const data = await res.json();
      setIssues(data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // Approve/Reject the problem
  const handleAction = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/issues/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setIssues((prev) => prev.filter((issue) => issue._id !== id));
      } else {
        console.error("Failed to update issue status");
      }
    } catch (error) {
      console.error("Error updating issue status:", error);
    }
  };

  const getAISuggestion = (desc) => {
    desc = desc.toLowerCase();
    if (desc.includes("accident") || desc.includes("fire"))
      return "⚠️ Emergency issue. Prioritize.";
    if (desc.includes("pothole"))
      return "🛣️ Road safety problem. Should be approved.";
    if (desc.includes("garbage")) return "🗑️ Sanitation problem. Needs action.";
    return "ℹ️ Needs manual review.";
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-3 text-neutral-content">
        🛠️ Admin Dashboard
      </h1>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((_, i) => (
            <div key={i} className="skeleton h-40 w-full rounded-xl"></div>
          ))}
        </div>
      ) : issues.length === 0 ? (
        <div className="alert alert-success shadow-lg text-lg">
          🎉 All reported issues have been reviewed!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="card bg-gray-200 bg-opacity-80 backdrop-blur-md text-black border-black-700 rounded-2xl p-6 mb-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="card-body space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="card-title text-xl flex items-center gap-2 text-warning">
                    <MdReportProblem className="text-yellow-400 text-2xl" />
                    {issue.title}
                  </h2>
                  <div className="badge badge-warning text-black">Pending</div>
                </div>

                <p className="text-base text-black-300">{issue.description}</p>
                <p className="text-sm text-black-200">
                  📍 <span className="font-semibold">Location:</span>{" "}
                  {issue.location}
                </p>

                <div className="mt-3 text-sm italic text-blue-800">
                  💬 <span className="font-bold">AI Suggestion:</span>{" "}
                  {getAISuggestion(issue.description)}
                </div>

                <div className="card-actions justify-end pt-4">
                  <button
                    className="btn btn-success btn-sm flex items-center gap-2 hover:scale-105 transition-transform"
                    onClick={() => handleAction(issue._id, "approved")}
                    disabled={loading}
                  >
                    <HiCheckCircle className="text-white text-lg" /> Approve
                  </button>
                  <button
                    className="btn btn-error btn-sm flex items-center gap-2 hover:scale-105 transition-transform"
                    onClick={() => handleAction(issue._id, "rejected")}
                    disabled={loading}
                  >
                    <HiXCircle className="text-white text-lg" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
