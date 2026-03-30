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

  if (!form) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={() => navigate(`/tickets/${id}`)}>← Back to Ticket</button>
      <div style={styles.card}>
        <h2>Edit Ticket</h2>
        {success && <p style={styles.success}>{success}</p>}
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Title</label>
          <input style={styles.input} name="title" value={form.title} onChange={handleChange} required />

          <label style={styles.label}>Description</label>
          <textarea style={{ ...styles.input, height: "120px", resize: "vertical" }} name="description" value={form.description} onChange={handleChange} required />

          <label style={styles.label}>Status</label>
          <select style={styles.input} name="status" value={form.status} onChange={handleChange}>
            {["Open", "In Progress", "Resolved", "Closed"].map(s => <option key={s}>{s}</option>)}
          </select>

          <label style={styles.label}>Priority</label>
          <select style={styles.input} name="priority" value={form.priority} onChange={handleChange}>
            {["Low", "Medium", "High", "Critical"].map(p => <option key={p}>{p}</option>)}
          </select>

          <button style={styles.submitBtn} type="submit">Save Changes</button>
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
  submitBtn: { marginTop: "1.5rem", width: "100%", padding: "10px", background: "#faad14", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" },
  success: { color: "green" },
  error: { color: "red" },
};