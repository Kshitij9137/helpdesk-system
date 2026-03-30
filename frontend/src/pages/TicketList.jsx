import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockTickets } from "../api/mockTickets";
// When backend ready, replace above with:
// import API from "../api/axios";

const statusColors = {
  "Open": "#1890ff",
  "In Progress": "#faad14",
  "Resolved": "#52c41a",
  "Closed": "#8c8c8c",
};

const priorityColors = {
  "Low": "#95de64",
  "Medium": "#ffd666",
  "High": "#ff7a45",
  "Critical": "#f5222d",
};

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    // --- MOCK ---
    setTickets(mockTickets);
    setFiltered(mockTickets);

    // --- REAL API (uncomment when backend ready) ---
    // API.get("/tickets/").then(res => {
    //   setTickets(res.data);
    //   setFiltered(res.data);
    // });
  }, []);

  useEffect(() => {
    let result = tickets;
    if (statusFilter !== "All") result = result.filter(t => t.status === statusFilter);
    if (priorityFilter !== "All") result = result.filter(t => t.priority === priorityFilter);
    setFiltered(result);
  }, [statusFilter, priorityFilter, tickets]);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2>All Tickets</h2>
        <button style={styles.createBtn} onClick={() => navigate("/tickets/create")}>
          + New Ticket
        </button>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div>
          <label style={styles.label}>Status: </label>
          <select style={styles.select} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            {["All", "Open", "In Progress", "Resolved", "Closed"].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={styles.label}>Priority: </label>
          <select style={styles.select} value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
            {["All", "Low", "Medium", "High", "Critical"].map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <span style={styles.count}>{filtered.length} ticket(s) found</span>
      </div>

      {/* Ticket Cards */}
      {filtered.length === 0 ? (
        <p style={{ color: "#888" }}>No tickets match your filters.</p>
      ) : (
        filtered.map(ticket => (
          <div key={ticket.id} style={styles.card} onClick={() => navigate(`/tickets/${ticket.id}`)}>
            <div style={styles.cardTop}>
              <span style={styles.ticketTitle}>{ticket.title}</span>
              <div style={styles.badges}>
                <span style={{ ...styles.badge, background: priorityColors[ticket.priority] }}>
                  {ticket.priority}
                </span>
                <span style={{ ...styles.badge, background: statusColors[ticket.status], color: "white" }}>
                  {ticket.status}
                </span>
              </div>
            </div>
            <div style={styles.cardBottom}>
              <span>👤 {ticket.assigned_to}</span>
              <span>🕐 {new Date(ticket.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  page: { padding: "2rem", maxWidth: "900px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" },
  createBtn: { padding: "8px 16px", background: "#1890ff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
  filters: { display: "flex", gap: "1.5rem", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap" },
  label: { fontWeight: "bold", marginRight: "6px" },
  select: { padding: "6px 10px", borderRadius: "4px", border: "1px solid #ccc" },
  count: { color: "#888", fontSize: "0.9rem" },
  card: { background: "white", border: "1px solid #e8e8e8", borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1rem", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" },
  ticketTitle: { fontWeight: "600", fontSize: "1rem" },
  badges: { display: "flex", gap: "8px" },
  badge: { padding: "3px 10px", borderRadius: "12px", fontSize: "0.78rem", fontWeight: "bold", color: "#333" },
  cardBottom: { display: "flex", gap: "1.5rem", color: "#888", fontSize: "0.85rem" },
};