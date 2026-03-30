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

  if (!ticket) return <p className="p-8">Ticket not found.</p>;

  return (
    <div className="p-8 max-w-187.5 mx-auto">
      <button className="bg-none border-none text-blue-500 cursor-pointer text-base mb-4 p-0" onClick={() => navigate("/tickets")}>← Back to Tickets</button>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="m-0">{ticket.title}</h2>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold text-gray-700" style={{ background: priorityColors[ticket.priority] }}>{ticket.priority}</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: statusColors[ticket.status] }}>{ticket.status}</span>
          </div>
        </div>

        <hr className="m-4" />

        <p className="text-base text-gray-600 leading-relaxed">{ticket.description}</p>

        <div className="flex gap-8 flex-wrap bg-gray-50 rounded-md p-4 mt-4">
          <div className="flex flex-col gap-1"><span className="text-xs text-gray-500 uppercase font-bold">Created by</span><span>{ticket.created_by}</span></div>
          <div className="flex flex-col gap-1"><span className="text-xs text-gray-500 uppercase font-bold">Assigned to</span><span>{ticket.assigned_to}</span></div>
          <div className="flex flex-col gap-1"><span className="text-xs text-gray-500 uppercase font-bold">Created at</span><span>{new Date(ticket.created_at).toLocaleString()}</span></div>
        </div>

        <div className="mt-6">
          <button className="p-2 px-5 bg-yellow-500 border-none rounded cursor-pointer font-bold" onClick={() => navigate(`/tickets/${ticket.id}/edit`)}>✏️ Edit Ticket</button>
        </div>
      </div>
    </div>
  );
}

