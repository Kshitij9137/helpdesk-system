import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockTickets } from "../api/mockTickets";
// import API from "../api/axios";

const statusColors = { "Open": "#1890ff", "In Progress": "#faad14", "Resolved": "#52c41a", "Closed": "#8c8c8c" };
const priorityColors = { "Low": "#95de64", "Medium": "#ffd666", "High": "#ff7a45", "Critical": "#f5222d" };

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // --- MOCK ---
    const found = mockTickets.find(t => t.id === parseInt(id));
    setTicket(found);

    // --- REAL API (uncomment when backend ready) ---
    // API.get(`/tickets/${id}/`).then(res => setTicket(res.data));
  }, [id]);

  if (!ticket) return <p style={{ padding: "2rem" }}>Ticket not found.</p>;

  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={() => navigate("/tickets")}>← Back to Tickets</button>

      <div style={styles.card}>
        <div style={styles.topRow}>
          <h2 style={{ margin: 0 }}>{ticket.title}</h2>
          <div style={styles.badges}>
            <span style={{ ...styles.badge, background: priorityColors[ticket.priority] }}>{ticket.priority}</span>
            <span style={{ ...styles.badge, background: statusColors[ticket.status], color: "white" }}>{ticket.status}</span>
          </div>
        </div>

        <hr style={{ margin: "1rem 0" }} />

        <p style={styles.description}>{ticket.description}</p>

        <div style={styles.meta}>
          <div style={styles.metaItem}><span style={styles.metaLabel}>Created by</span><span>{ticket.created_by}</span></div>
          <div style={styles.metaItem}><span style={styles.metaLabel}>Assigned to</span><span>{ticket.assigned_to}</span></div>
          <div style={styles.metaItem}><span style={styles.metaLabel}>Created at</span><span>{new Date(ticket.created_at).toLocaleString()}</span></div>
        </div>

        <div style={styles.actions}>
          <button style={styles.editBtn} onClick={() => navigate(`/tickets/${ticket.id}/edit`)}>✏️ Edit Ticket</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "2rem", maxWidth: "750px", margin: "0 auto" },
  backBtn: { background: "none", border: "none", color: "#1890ff", cursor: "pointer", fontSize: "1rem", marginBottom: "1rem", padding: 0 },
  card: { background: "white", borderRadius: "8px", padding: "1.5rem 2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" },
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  badges: { display: "flex", gap: "8px" },
  badge: { padding: "4px 12px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "bold", color: "#333" },
  description: { fontSize: "1rem", color: "#444", lineHeight: "1.6" },
  meta: { display: "flex", gap: "2rem", flexWrap: "wrap", background: "#fafafa", borderRadius: "6px", padding: "1rem", marginTop: "1rem" },
  metaItem: { display: "flex", flexDirection: "column", gap: "4px" },
  metaLabel: { fontSize: "0.75rem", color: "#888", textTransform: "uppercase", fontWeight: "bold" },
  actions: { marginTop: "1.5rem" },
  editBtn: { padding: "8px 20px", background: "#faad14", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
};