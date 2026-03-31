import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// ✅ FIX: removed duplicate useEffect and mock import
import API from "../api/axios";

const statusColors = {
  "open":        "#1890ff",
  "in_progress": "#faad14",
  "resolved":    "#52c41a",
  "closed":      "#8c8c8c",
};

const priorityColors = {
  "low":      "#95de64",
  "medium":   "#ffd666",
  "high":     "#ff7a45",
  "critical": "#f5222d",
};

export default function TicketList() {
  const [tickets, setTickets]           = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [loading, setLoading]           = useState(true);
  const navigate = useNavigate();

  // ✅ FIX: single useEffect with only real API call
  useEffect(() => {
    API.get("/tickets/")
      .then(res => {
        setTickets(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch(() => {
        console.error("Failed to fetch tickets");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = tickets;
    if (statusFilter !== "All")
      result = result.filter(t => t.status === statusFilter.toLowerCase().replace(" ", "_"));
    if (priorityFilter !== "All")
      result = result.filter(t => t.priority === priorityFilter.toLowerCase());
    setFiltered(result);
  }, [statusFilter, priorityFilter, tickets]);

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-400">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mr-3" />
      Loading tickets...
    </div>
  );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2>All Tickets</h2>
        <button
          className="p-2 px-4 bg-blue-500 text-white border-none rounded cursor-pointer font-bold"
          onClick={() => navigate("/tickets/create")}
        >
          + New Ticket
        </button>
      </div>

      <div className="flex gap-6 items-center mb-6 flex-wrap">
        <div>
          <label className="font-bold mr-1.5">Status: </label>
          <select
            className="p-1.5 px-2.5 rounded border border-gray-300"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            {["All", "Open", "In Progress", "Resolved", "Closed"].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-bold mr-1.5">Priority: </label>
          <select
            className="p-1.5 px-2.5 rounded border border-gray-300"
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
          >
            {["All", "Low", "Medium", "High", "Critical"].map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <span className="text-gray-500 text-sm">{filtered.length} ticket(s) found</span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No tickets match your filters.</p>
      ) : (
        filtered.map(ticket => (
          <div
            key={ticket.id}
            className="bg-white border border-gray-200 rounded-lg p-4 px-5 mb-4 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            onClick={() => navigate(`/tickets/${ticket.id}`)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-base">{ticket.title}</span>
              <div className="flex gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold text-gray-700"
                  style={{ background: priorityColors[ticket.priority] ?? "#eee" }}
                >
                  {ticket.priority}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                  style={{ background: statusColors[ticket.status] ?? "#888" }}
                >
                  {ticket.status}
                </span>
              </div>
            </div>
            <div className="flex gap-6 text-gray-400 text-xs">
              <span>👤 {ticket.assigned_to ?? "Unassigned"}</span>
              <span>🕐 {new Date(ticket.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}