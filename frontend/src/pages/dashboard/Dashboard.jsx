import { useState, useEffect } from "react";
import SummaryCards from "./SummaryCards";
import TicketTrendsChart from "./TicketTrendsChart";
import ResolutionTimeChart from "./ResolutionTimeChart";
import AgentStatsTable from "./AgentStatsTable";
// ✅ FIX: Added missing API import
import API from "../../api/axios";

export default function Dashboard() {
  const [summary, setSummary]     = useState(null);
  const [trends, setTrends]       = useState(null);
  const [resolution, setResolution] = useState(null);
  const [agents, setAgents]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);

  useEffect(() => {
    Promise.all([
      API.get("/analytics/summary/"),
      API.get("/analytics/trends/"),
      API.get("/analytics/resolution-time/"),
      API.get("/analytics/agent-performance/"),
    ]).then(([s, t, r, a]) => {
      setSummary(s.data);
      setTrends({
        labels:   t.data.daily_trend.map(d => d.date),
        created:  t.data.daily_trend.map(d => d.count),
        resolved: t.data.daily_trend.map(d => d.count),
      });
      setResolution({
        labels:     ["Low", "Medium", "High", "Critical"],
        avgHours:   [0, 0, 0, 0],
        slaTargets: [72, 24, 4, 1],
      });
      setAgents(a.data.map(agent => ({
        name:      agent.agent_username,
        resolved:  agent.resolved,
        avg_hours: 0,
      })));
      setLoading(false);
    }).catch(() => {
      setError(true);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-red-400">
        <p className="text-lg font-semibold">⚠️ Failed to load dashboard.</p>
        <p className="text-sm mt-1">Make sure Django backend is running at http://127.0.0.1:8000</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-7">
        <h2 className="m-0">Dashboard</h2>
        <p className="text-gray-500 m-0 mt-1 text-sm">
          Overview as of {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-0">
        <div className="min-w-0"><TicketTrendsChart trends={trends} /></div>
        <div className="min-w-0"><ResolutionTimeChart resolutionData={resolution} /></div>
      </div>

      <AgentStatsTable agents={agents} />
    </div>
  );
}