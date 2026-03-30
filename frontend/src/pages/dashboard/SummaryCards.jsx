const cards = [
  { label: "Total Tickets",   key: "total",       color: "#1890ff", bg: "#e6f4ff", icon: "🎫" },
  { label: "Open",            key: "open",        color: "#ff7a45", bg: "#fff2e8", icon: "🔴" },
  { label: "In Progress",     key: "in_progress", color: "#faad14", bg: "#fffbe6", icon: "🟡" },
  { label: "Resolved",        key: "resolved",    color: "#52c41a", bg: "#f6ffed", icon: "🟢" },
  { label: "Closed",          key: "closed",      color: "#8c8c8c", bg: "#f5f5f5", icon: "⚫" },
];

export default function SummaryCards({ summary }) {
  return (
    <div style={styles.grid}>
      {cards.map(card => (
        <div key={card.key} style={{ ...styles.card, borderTop: `4px solid ${card.color}`, background: card.bg }}>
          <div style={styles.cardTop}>
            <span style={styles.icon}>{card.icon}</span>
            <span style={{ ...styles.count, color: card.color }}>
              {summary[card.key] ?? 0}
            </span>
          </div>
          <p style={styles.label}>{card.label}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" },
  card: { borderRadius: "8px", padding: "1.25rem 1rem", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" },
  icon: { fontSize: "1.5rem" },
  count: { fontSize: "2rem", fontWeight: "800", lineHeight: 1 },
  label: { margin: 0, color: "#555", fontWeight: "600", fontSize: "0.85rem" },
};