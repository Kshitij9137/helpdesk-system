import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import API from "../api/axios";
// import { mockTickets } from "../api/mockTickets";

export default function CreateTicket() {
  const [form, setForm] = useState({ title: "", description: "", priority: "Medium" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // --- MOCK ---
      console.log("New ticket (mock):", form);
      setSuccess("Ticket created successfully!");
      setTimeout(() => navigate("/tickets"), 1500);

      // --- REAL API (uncomment when backend ready) ---
      // await API.post("/tickets/", form);
      // setSuccess("Ticket created successfully!");
      // setTimeout(() => navigate("/tickets"), 1500);
    } catch (err) {
      setError("Failed to create ticket. Try again.");
    }
  };

  return (
    <div className="p-8 max-w-162.5 mx-auto">
      <button className="bg-none border-none text-blue-500 cursor-pointer text-base mb-4 p-0" onClick={() => navigate("/tickets")}>← Back to Tickets</button>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2>Create New Ticket</h2>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block font-bold mb-1 mt-4">Title</label>
          <input className="w-full p-2.5 rounded border border-gray-300 box-border text-sm" name="title" placeholder="Brief summary of the issue" value={form.title} onChange={handleChange} required />

          <label className="block font-bold mb-1 mt-4">Description</label>
          <textarea className="w-full p-2.5 rounded border border-gray-300 box-border text-sm h-30 resize-y" name="description" placeholder="Describe the problem in detail..." value={form.description} onChange={handleChange} required />

          <label className="block font-bold mb-1 mt-4">Priority</label>
          <select className="w-full p-2.5 rounded border border-gray-300 box-border text-sm" name="priority" value={form.priority} onChange={handleChange}>
            {["Low", "Medium", "High", "Critical"].map(p => <option key={p}>{p}</option>)}
          </select>

          <button className="mt-6 w-full p-2.5 bg-green-500 text-white border-none rounded cursor-pointer font-bold text-base" type="submit">Create Ticket</button>
        </form>
      </div>
    </div>
  );
}

