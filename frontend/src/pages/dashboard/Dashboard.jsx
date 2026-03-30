import { useState, useEffect } from "react";
import SummaryCards from "./SummaryCards";
import TicketTrendsChart from "./TicketTrendsChart";
import ResolutionTimeChart from "./ResolutionTimeChart";
import AgentStatsTable from "./AgentStatsTable";
import { mockSummary, mockTicketTrends, mockResolutionTime, mockAgentStats } from "../../api/mockAnalytics";
// import API from "../../api/axios";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState(null);
  const [resolution, setResolution] = useState(null);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // --- MOCK ---
    setSummary(mockSummary);
    setTrends(mockTicketTrends);
    setResolution(mockResolutionTime);
    setAgents(mockAgentStats);
    setLoading(false);

    // --- REAL API (uncomment when backend ready) ---
    // Promise.all([
    //   API.get("/analytics/summary/"),
    //   API.get("/analytics/trends/"),
    //   API.get("/analytics/resolution-time/"),
    //   API.get("/analytics/agents/"),
    // ]).then(([s, t, r, a]) => {
    //   setSummary(s.data);
    //   setTrends(t.data);
    //   setResolution(r.data);
    //   setAgents(a.data);
    //   setLoading(false);
    // });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-275 mx-auto">

      {/* Page Header */}
      <div className="mb-7">
        <div>
          <h2 className="m-0">Dashboard</h2>
          <p className="text-gray-500 m-0 mt-1 text-sm">
            Overview as of {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards summary={summary} />

      {/* Two charts side by side on wider screens */}
      <div className="grid grid-cols-2 gap-6 mb-0">
        <div className="min-w-0">
          <TicketTrendsChart trends={trends} />
        </div>
        <div className="min-w-0">
          <ResolutionTimeChart resolutionData={resolution} />
        </div>
      </div>

      {/* Agent Stats Table */}
      <AgentStatsTable agents={agents} />

    </div>
  );
}

