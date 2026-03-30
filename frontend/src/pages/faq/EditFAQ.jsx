import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockFAQs } from "../../api/mockFAQs";
// import API from "../../api/axios";

const CATEGORIES = ["Account", "Tickets", "Privacy"];

export default function EditFAQ() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // --- MOCK ---
    const found = mockFAQs.find(f => f.id === parseInt(id));
    if (found) setForm({ ...found, tags: found.tags.join(", ") });

    // --- REAL API (uncomment when backend ready) ---
    // API.get(`/knowledge-base/${id}/`).then(res =>
    //   setForm({ ...res.data, tags: res.data.tags.join(", ") })
    // );
  }, [id]);

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
      console.log("Updated FAQ (mock):", payload);
      setSuccess("FAQ updated successfully!");
      setTimeout(() => navigate(`/faq/${id}`), 1500);

      // --- REAL API (uncomment when backend ready) ---
      // await API.put(`/knowledge-base/${id}/`, payload);
      // setSuccess("FAQ updated successfully!");
      // setTimeout(() => navigate(`/faq/${id}`), 1500);
    } catch (err) {
      setError("Failed to update FAQ.");
    }
  };

  if (!form) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={() => navigate(`/faq/${id}`)}>← Back to FAQ</button>
      <div style={styles.card}>
        <h2>Edit FAQ</h2>
        {success && <p style={styles.success}>{success}</p>}
        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Question</label>
          <input style={styles.input} name="question" value={form.question} onChange={handleChange} required />

          <label style={styles.label}>Answer</label>
          <textarea style={{ ...styles.input, height: "140px", resize: "vertical" }} name="answer" value={form.answer} onChange={handleChange} required />

          <label style={styles.label}>Category</label>
          <select style={styles.input} name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>

          <label style={styles.label}>Tags <span style={styles.hint}>(comma separated)</span></label>
          <input style={styles.input} name="tags" value={form.tags} onChange={handleChange} />

          <button style={styles.submitBtn} type="submit">Save Changes</button>
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
  submitBtn: { marginTop: "1.5rem", width: "100%", padding: "10px", background: "#faad14", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" },
  success: { color: "green" },
  error: { color: "red" },
};