import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const statusColors   = { "open": "#1890ff", "in_progress": "#faad14", "resolved": "#52c41a", "closed": "#8c8c8c" };
const priorityColors = { "low": "#95de64",  "medium": "#ffd666",      "high": "#ff7a45",     "critical": "#f5222d" };

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket]   = useState(null);
  const [agents, setAgents]   = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [assignMsg, setAssignMsg] = useState("");
  const [assignErr, setAssignErr] = useState("");
  const navigate = useNavigate();

  const { user } = useAuth();
  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "User";

  // Fetch ticket
  useEffect(() => {
    API.get(`/tickets/${id}/`)
      .then(res => setTicket(res.data))
      .catch(() => console.error("Failed to fetch ticket"));
  }, [id]);

  // Fetch all users and filter agents (admin only)
  useEffect(() => {
    if (role === "Admin") {
      API.get("/users/all-users/")
        .then(res => {
          const agentList = res.data.filter(u => u.role === "agent");
          setAgents(agentList);
        })
        .catch(() => console.error("Failed to fetch agents"));
    }
  }, [role]);

  const handleAssign = async () => {
    if (!selectedAgent) {
      setAssignErr("Please select an agent first.");
      return;
    }
    setAssignErr("");
    try {
      const res = await API.patch(`/tickets/${id}/assign/`, {
        assigned_to: parseInt(selectedAgent),
      });
      setTicket(res.data);
      setAssignMsg("✅ Ticket assigned successfully!");
      setTimeout(() => setAssignMsg(""), 3000);
    } catch {
      setAssignErr("Failed to assign ticket.");
    }
  };

  if (!ticket) return <p className="p-8 text-gray-400">Loading ticket...</p>;

  const statusKey   = ticket.status?.toLowerCase().replace(" ", "_");
  const priorityKey = ticket.priority?.toLowerCase();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button
        className="bg-transparent border-none text-blue-500 cursor-pointer text-base mb-4 p-0"
        onClick={() => navigate("/tickets")}
      >
        ← Back to Tickets
      </button>

      {/* Main Ticket Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
        <div className="flex justify-between items-center">
          <h2 className="m-0">{ticket.title}</h2>
          <div className="flex gap-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold text-gray-700"
              style={{ background: priorityColors[priorityKey] ?? "#eee" }}
            >
              {ticket.priority}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{ background: statusColors[statusKey] ?? "#888" }}
            >
              {ticket.status}
            </span>
          </div>
        </div>

        <hr className="my-4" />
        <p className="text-base text-gray-600 leading-relaxed">{ticket.description}</p>

        <div className="flex gap-8 flex-wrap bg-gray-50 rounded-md p-4 mt-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400 uppercase font-bold">Created by</span>
            <span>{ticket.created_by}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400 uppercase font-bold">Assigned to</span>
            <span className={ticket.assigned_to ? "text-blue-500 font-semibold" : "text-gray-400"}>
              {ticket.assigned_to ?? "Unassigned"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400 uppercase font-bold">Created at</span>
            <span>{new Date(ticket.created_at).toLocaleString()}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400 uppercase font-bold">Last updated</span>
            <span>{new Date(ticket.updated_at).toLocaleString()}</span>
          </div>
        </div>

        {/* Edit button — visible to everyone */}
        <div className="mt-6">
          <button
            className="p-2 px-5 bg-yellow-500 border-none rounded cursor-pointer font-bold"
            onClick={() => navigate(`/tickets/${ticket.id}/edit`)}
          >
            ✏️ Edit Ticket
          </button>
        </div>
      </div>

      {/* ── Assign Ticket Section — Admin only ── */}
      {role === "Admin" && (
        <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
          <h3 className="m-0 mb-4 text-base font-bold">🔧 Assign Ticket to Agent</h3>

          {assignMsg && (
            <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg px-4 py-2.5 mb-3">
              {assignMsg}
            </div>
          )}
          {assignErr && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5 mb-3">
              ⚠️ {assignErr}
            </div>
          )}

          {agents.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No agents available. Register a user with role "agent" first.
            </p>
          ) : (
            <div className="flex gap-3 items-center flex-wrap">
              <select
                className="p-2 px-3 rounded border border-gray-300 text-sm flex-1 min-w-48"
                value={selectedAgent}
                onChange={e => setSelectedAgent(e.target.value)}
              >
                <option value="">— Select an agent —</option>
                {agents.map(agent => (
                  <option key={agent.id} value={agent.id}>
                    {agent.username} ({agent.email})
                  </option>
                ))}
              </select>
              <button
                className="p-2 px-5 bg-blue-500 text-white border-none rounded cursor-pointer font-bold text-sm"
                onClick={handleAssign}
              >
                Assign →
              </button>
            </div>
          )}

          <p className="text-xs text-gray-400 mt-3">
            ℹ️ Assigning a ticket automatically changes its status to <strong>In Progress</strong>.
          </p>
        </div>
      )}

      {/* ── Status Update Section — Agent only ── */}
      {role === "Agent" && (
        <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
          <h3 className="m-0 mb-4 text-base font-bold">🛠️ Update Ticket Status</h3>
          <p className="text-sm text-gray-500 mb-4">
            As an agent, you can update this ticket's status to reflect your progress.
          </p>
          <div className="flex gap-3 flex-wrap">
            {["in_progress", "resolved"].map(s => (
              <button
                key={s}
                disabled={ticket.status === s}
                className={`px-4 py-2 rounded font-semibold text-sm border-none cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  s === "resolved"
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-yellow-400 text-white hover:bg-yellow-500"
                }`}
                onClick={async () => {
                  try {
                    const res = await API.patch(`/tickets/${id}/`, { status: s });
                    setTicket(res.data);
                  } catch {
                    alert("Failed to update status.");
                  }
                }}
              >
                {s === "in_progress" ? "🔄 Mark In Progress" : "✅ Mark Resolved"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Admin Close Ticket ── */}
      {role === "Admin" && ticket.status === "resolved" && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-4">
          <p className="font-semibold text-green-700 mb-3">
            ✅ This ticket has been resolved. You can now close it.
          </p>
          <button
            className="px-5 py-2 bg-gray-700 text-white rounded font-bold border-none cursor-pointer hover:bg-gray-800"
            onClick={async () => {
              try {
                const res = await API.patch(`/tickets/${id}/`, { status: "closed" });
                setTicket(res.data);
              } catch {
                alert("Failed to close ticket.");
              }
            }}
          >
            🔒 Close Ticket
          </button>
        </div>
      )}
    </div>
  );
}