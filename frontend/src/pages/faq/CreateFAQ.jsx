import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import API from "../../api/axios";

const CATEGORIES = ["Account", "Tickets", "Privacy"];

export default function CreateFAQ() {
  const [form, setForm] = useState({ question: "", answer: "", category: "Account", tags: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      };

      // --- MOCK ---
      console.log("New FAQ (mock):", payload);
      setSuccess("FAQ created successfully!");
      setTimeout(() => navigate("/faq"), 1500);

      // --- REAL API (uncomment when backend ready) ---
      // await API.post("/knowledge-base/", payload);
      // setSuccess("FAQ created successfully!");
      // setTimeout(() => navigate("/faq"), 1500);
    } catch (err) {
      setError("Failed to create FAQ. Try again.");
    }
  };

  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={() => navigate("/faq")}>← Back to Knowledge Base</button>
      <div style={styles.card}>
        <h2>Add New FAQ</h2>
        {success && <p style={styles.success}>{success}</p>}
        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Question</label>
          <input
            style={styles.input}
            name="question"
            placeholder="e.g. How do I reset my password?"
            value={form.question}
            onChange={handleChange}
            required
          />

          <label style={styles.label}>Answer</label>
          <textarea
            style={{ ...styles.input, height: "140px", resize: "vertical" }}
            name="answer"
            placeholder="Write a clear, helpful answer..."
            value={form.answer}
            onChange={handleChange}
            required
          />

          <label style={styles.label}>Category</label>
          <select style={styles.input} name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>

          <label style={styles.label}>Tags <span style={styles.hint}>(comma separated, e.g. login, password, account)</span></label>
          <input
            style={styles.input}
            name="tags"
            placeholder="login, password, account"
            value={form.tags}
            onChange={handleChange}
          />

          <button style={styles.submitBtn} type="submit">Create FAQ</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "2rem", maxWidth: "650px", margin: "0 auto" },
  backBtn: { background: "none", border: "none", color: "#1890ff", cursor: "pointer", fontSize: "1rem", marginBottom: "1rem", padding: 0 },
  card: { background: "white", borderRadius: "8px", padding: "1.75rem 2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" },
  label: { display: "block", fontWeight: "bold", marginBottom: "4px", marginTop: "1rem" },
  hint: { fontWeight: "normal", color: "#aaa", fontSize: "0.85rem" },
  input: { width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box", fontSize: "0.95rem" },
  submitBtn: { marginTop: "1.5rem", width: "100%", padding: "10px", background: "#52c41a", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" },
  success: { color: "green" },
  error: { color: "red" },
};