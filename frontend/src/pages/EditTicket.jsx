import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockTickets } from "../api/mockTickets";
// import API from "../api/axios";

export default function EditTicket() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // --- MOCK ---
    const found = mockTickets.find(t => t.id === parseInt(id));
    if (found) setForm({ ...found });

    // --- REAL API (uncomment when backend ready) ---
    // API.get(`/tickets/${id}/`).then(res => setForm(res.data));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // --- MOCK ---
      console.log("Updated ticket (mock):", form);
      setSuccess("Ticket updated successfully!");
      setTimeout(() => navigate(`/tickets/${id}`), 1500);

      // --- REAL API (uncomment when backend ready) ---
      // await API.put(`/tickets/${id}/`, form);
      // setSuccess("Ticket updated successfully!");
      // setTimeout(() => navigate(`/tickets/${id}`), 1500);
    } catch (err) {
      setError("Failed to update ticket.");
    }
  };

  if (!form) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 max-w-162.5 mx-auto">
      <button className="bg-none border-none text-blue-500 cursor-pointer text-base mb-4 p-0" onClick={() => navigate(`/tickets/${id}`)}>← Back to Ticket</button>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2>Edit Ticket</h2>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block font-bold mb-1 mt-4">Title</label>
          <input className="w-full p-2.5 rounded border border-gray-300 box-border text-sm" name="title" value={form.title} onChange={handleChange} required />

          <label className="block font-bold mb-1 mt-4">Description</label>
          <textarea className="w-full p-2.5 rounded border border-gray-300 box-border text-sm h-30 resize-y" name="description" value={form.description} onChange={handleChange} required />

          <label className="block font-bold mb-1 mt-4">Status</label>
          <select className="w-full p-2.5 rounded border border-gray-300 box-border text-sm" name="status" value={form.status} onChange={handleChange}>
            {["Open", "In Progress", "Resolved", "Closed"].map(s => <option key={s}>{s}</option>)}
          </select>

          <label className="block font-bold mb-1 mt-4">Priority</label>
          <select className="w-full p-2.5 rounded border border-gray-300 box-border text-sm" name="priority" value={form.priority} onChange={handleChange}>
            {["Low", "Medium", "High", "Critical"].map(p => <option key={p}>{p}</option>)}
          </select>

          <button className="mt-6 w-full p-2.5 bg-yellow-500 text-white border-none rounded cursor-pointer font-bold text-base" type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

