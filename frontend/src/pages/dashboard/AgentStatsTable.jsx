export default function AgentStatsTable({ agents }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>👤 Agent Performance</h3>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Agent</th>
            <th style={styles.th}>Tickets Resolved</th>
            <th style={styles.th}>Avg Resolution Time</th>
            <th style={styles.th}>Performance</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, i) => (
            <tr key={i} style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
              <td style={styles.td}>🧑‍💼 {agent.name}</td>
              <td style={{ ...styles.td, textAlign: "center", fontWeight: "bold", color: "#52c41a" }}>
                {agent.resolved}
              </td>
              <td style={{ ...styles.td, textAlign: "center" }}>
                {agent.avg_hours} hrs
              </td>
              <td style={{ ...styles.td, textAlign: "center" }}>
                <span style={{
                  ...styles.badge,
                  background: agent.avg_hours <= 4 ? "#f6ffed" : agent.avg_hours <= 8 ? "#fffbe6" : "#fff2e8",
                  color: agent.avg_hours <= 4 ? "#52c41a" : agent.avg_hours <= 8 ? "#faad14" : "#ff4d4f",
                }}>
                  {agent.avg_hours <= 4 ? "🟢 Excellent" : agent.avg_hours <= 8 ? "🟡 Good" : "🔴 Needs Improvement"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  card: { background: "white", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", marginBottom: "1.5rem" },
  title: { margin: "0 0 1rem 0", fontSize: "1rem", fontWeight: "700" },
  table: { width: "100%", borderCollapse: "collapse" },
  headerRow: { background: "#fafafa" },
  th: { padding: "10px 14px", textAlign: "left", fontWeight: "700", fontSize: "0.85rem", color: "#888", borderBottom: "2px solid #f0f0f0" },
  td: { padding: "12px 14px", fontSize: "0.9rem", borderBottom: "1px solid #f5f5f5" },
  rowEven: { background: "white" },
  rowOdd: { background: "#fafafa" },
  badge: { padding: "3px 10px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "bold" },
};