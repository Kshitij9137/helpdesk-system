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
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={() => navigate("/tickets")}>← Back to Tickets</button>
      <div style={styles.card}>
        <h2>Create New Ticket</h2>
        {success && <p style={styles.success}>{success}</p>}
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Title</label>
          <input style={styles.input} name="title" placeholder="Brief summary of the issue" value={form.title} onChange={handleChange} required />

          <label style={styles.label}>Description</label>
          <textarea style={{ ...styles.input, height: "120px", resize: "vertical" }} name="description" placeholder="Describe the problem in detail..." value={form.description} onChange={handleChange} required />

          <label style={styles.label}>Priority</label>
          <select style={styles.input} name="priority" value={form.priority} onChange={handleChange}>
            {["Low", "Medium", "High", "Critical"].map(p => <option key={p}>{p}</option>)}
          </select>

          <button style={styles.submitBtn} type="submit">Create Ticket</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "2rem", maxWidth: "650px", margin: "0 auto" },
  backBtn: { background: "none", border: "none", color: "#1890ff", cursor: "pointer", fontSize: "1rem", marginBottom: "1rem", padding: 0 },
  card: { background: "white", borderRadius: "8px", padding: "1.5rem 2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" },
  label: { display: "block", fontWeight: "bold", marginBottom: "4px", marginTop: "1rem" },
  input: { width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box", fontSize: "0.95rem" },
  submitBtn: { marginTop: "1.5rem", width: "100%", padding: "10px", background: "#52c41a", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" },
  success: { color: "green" },
  error: { color: "red" },
};