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
    <div className="p-8 max-w-225 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2>All Tickets</h2>
        <button className="p-2 px-4 bg-blue-500 text-white border-none rounded cursor-pointer font-bold" onClick={() => navigate("/tickets/create")}>
          + New Ticket
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-6 items-center mb-6 flex-wrap">
        <div>
          <label className="font-bold mr-1.5">Status: </label>
          <select className="p-1.5 px-2.5 rounded border border-gray-300" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            {["All", "Open", "In Progress", "Resolved", "Closed"].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-bold mr-1.5">Priority: </label>
          <select className="p-1.5 px-2.5 rounded border border-gray-300" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
            {["All", "Low", "Medium", "High", "Critical"].map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <span className="text-gray-500 text-sm">{filtered.length} ticket(s) found</span>
      </div>

      {/* Ticket Cards */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No tickets match your filters.</p>
      ) : (
        filtered.map(ticket => (
          <div key={ticket.id} className="bg-white border border-gray-200 rounded-lg p-4 px-5 mb-4 cursor-pointer shadow-sm transition-shadow duration-200" onClick={() => navigate(`/tickets/${ticket.id}`)}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-base">{ticket.title}</span>
              <div className="flex gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-gray-700" style={{ background: priorityColors[ticket.priority] }}>
                  {ticket.priority}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: statusColors[ticket.status] }}>
                  {ticket.status}
                </span>
              </div>
            </div>
            <div className="flex gap-6 text-gray-500 text-xs">
              <span>👤 {ticket.assigned_to}</span>
              <span>🕐 {new Date(ticket.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

