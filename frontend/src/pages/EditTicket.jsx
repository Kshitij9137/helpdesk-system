import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// ✅ FIX: removed mock import, added real API import
import API from "../api/axios";

export default function EditTicket() {
  const { id } = useParams();
  const [form, setForm]       = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ FIX: using real API
    API.get(`/tickets/${id}/`)
      .then(res => setForm(res.data))
      .catch(() => setError("Failed to load ticket."));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.patch(`/tickets/${id}/`, {
        title:       form.title,
        description: form.description,
        status:      form.status,
        priority:    form.priority,
      });
      setSuccess("Ticket updated successfully!");
      setTimeout(() => navigate(`/tickets/${id}`), 1500);
    } catch {
      setError("Failed to update ticket.");
    } finally {
      setLoading(false);
    }
  };

  if (!form) return <p className="p-8 text-gray-400">Loading...</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button
        className="bg-transparent border-none text-blue-500 cursor-pointer text-base mb-4 p-0"
        onClick={() => navigate(`/tickets/${id}`)}
      >
        ← Back to Ticket
      </button>
      <div className="bg-white rounded-lg p-7 shadow-sm">
        <h2>Edit Ticket</h2>
        {success && <p className="text-green-500">{success}</p>}
        {error   && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block font-bold mb-1 mt-4">Title</label>
          <input
            className="w-full p-2.5 rounded border border-gray-300 box-border text-sm"
            name="title" value={form.title} onChange={handleChange} required
          />

          <label className="block font-bold mb-1 mt-4">Description</label>
          <textarea
            className="w-full p-2.5 rounded border border-gray-300 box-border text-sm h-28 resize-y"
            name="description" value={form.description} onChange={handleChange} required
          />

          <label className="block font-bold mb-1 mt-4">Status</label>
          <select
            className="w-full p-2.5 rounded border border-gray-300 box-border text-sm"
            name="status" value={form.status} onChange={handleChange}
          >
            {["open", "in_progress", "resolved", "closed"].map(s => (
              <option key={s} value={s}>
                {s.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>

          <label className="block font-bold mb-1 mt-4">Priority</label>
          <select
            className="w-full p-2.5 rounded border border-gray-300 box-border text-sm"
            name="priority" value={form.priority} onChange={handleChange}
          >
            {["low", "medium", "high", "critical"].map(p => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>

          <button
            className="mt-6 w-full p-2.5 bg-yellow-500 text-white border-none rounded cursor-pointer font-bold text-base disabled:opacity-60"
            type="submit" disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}