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
      <div style={styles.loading}>
        <div style={styles.spinner} />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* Page Header */}
      <div style={styles.header}>
        <div>
          <h2 style={{ margin: 0 }}>Dashboard</h2>
          <p style={styles.subtitle}>
            Overview as of {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards summary={summary} />

      {/* Two charts side by side on wider screens */}
      <div style={styles.chartsRow}>
        <div style={styles.chartLeft}>
          <TicketTrendsChart trends={trends} />
        </div>
        <div style={styles.chartRight}>
          <ResolutionTimeChart resolutionData={resolution} />
        </div>
      </div>

      {/* Agent Stats Table */}
      <AgentStatsTable agents={agents} />

    </div>
  );
}

const styles = {
  page: { padding: "2rem", maxWidth: "1100px", margin: "0 auto" },
  header: { marginBottom: "1.75rem" },
  subtitle: { color: "#888", margin: "4px 0 0 0", fontSize: "0.9rem" },
  chartsRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "0" },
  chartLeft: { minWidth: 0 },   // prevents chart overflow
  chartRight: { minWidth: 0 },
  loading: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", color: "#888" },
  spinner: { width: "40px", height: "40px", border: "4px solid #f0f0f0", borderTop: "4px solid #1890ff", borderRadius: "50%", animation: "spin 0.8s linear infinite", marginBottom: "1rem" },
};