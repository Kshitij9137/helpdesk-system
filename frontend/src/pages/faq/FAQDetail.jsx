import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockFAQs } from "../../api/mockFAQs";
// import API from "../../api/axios";

const CURRENT_USER_ROLE = "Admin"; // swap with real role from AuthContext later

export default function FAQDetail() {
  const { id } = useParams();
  const [faq, setFaq] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // --- MOCK ---
    const found = mockFAQs.find(f => f.id === parseInt(id));
    setFaq(found);

    // --- REAL API (uncomment when backend ready) ---
    // API.get(`/knowledge-base/${id}/`).then(res => setFaq(res.data));
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;

    // --- MOCK ---
    setDeleted(true);
    setTimeout(() => navigate("/faq"), 1500);

    // --- REAL API (uncomment when backend ready) ---
    // API.delete(`/knowledge-base/${id}/`).then(() => {
    //   setDeleted(true);
    //   setTimeout(() => navigate("/faq"), 1500);
    // });
  };

  if (deleted) return <p style={{ padding: "2rem", color: "red" }}>FAQ deleted. Redirecting...</p>;
  if (!faq) return <p style={{ padding: "2rem" }}>FAQ not found.</p>;

  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={() => navigate("/faq")}>← Back to Knowledge Base</button>

      <div style={styles.card}>

        {/* Category + Tags */}
        <div style={styles.topMeta}>
          <span style={styles.categoryBadge}>{faq.category}</span>
          <div style={styles.tags}>
            {faq.tags.map(tag => (
              <span key={tag} style={styles.tag}>#{tag}</span>
            ))}
          </div>
        </div>

        {/* Question */}
        <h2 style={styles.question}>{faq.question}</h2>

        <hr style={{ margin: "1rem 0" }} />

        {/* Answer */}
        <p style={styles.answer}>{faq.answer}</p>

        {/* Admin Actions */}
        {CURRENT_USER_ROLE === "Admin" && (
          <div style={styles.actions}>
            <button
              style={styles.editBtn}
              onClick={() => navigate(`/faq/${faq.id}/edit`)}
            >
              ✏️ Edit
            </button>
            <button style={styles.deleteBtn} onClick={handleDelete}>
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      {/* Was this helpful? */}
      <div style={styles.helpful}>
        <p style={{ margin: "0 0 8px 0", fontWeight: "bold" }}>Was this helpful?</p>
        <div style={styles.helpfulBtns}>
          <button style={styles.helpfulBtn}>👍 Yes</button>
          <button style={styles.helpfulBtn}>👎 No</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "2rem", maxWidth: "750px", margin: "0 auto" },
  backBtn: { background: "none", border: "none", color: "#1890ff", cursor: "pointer", fontSize: "1rem", marginBottom: "1rem", padding: 0 },
  card: { background: "white", borderRadius: "8px", padding: "1.75rem 2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" },
  topMeta: { display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "1rem" },
  categoryBadge: { padding: "4px 12px", background: "#f0f5ff", color: "#1890ff", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "bold" },
  tags: { display: "flex", gap: "6px", flexWrap: "wrap" },
  tag: { background: "#f5f5f5", color: "#888", padding: "3px 8px", borderRadius: "4px", fontSize: "0.78rem" },
  question: { fontSize: "1.3rem", fontWeight: "700", margin: "0 0 0.5rem 0", color: "#222" },
  answer: { fontSize: "1rem", color: "#444", lineHeight: "1.8", margin: 0 },
  actions: { display: "flex", gap: "10px", marginTop: "1.5rem" },
  editBtn: { padding: "8px 20px", background: "#faad14", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
  deleteBtn: { padding: "8px 20px", background: "#ff4d4f", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
  helpful: { marginTop: "1.5rem", background: "white", borderRadius: "8px", padding: "1.25rem 2rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", textAlign: "center" },
  helpfulBtns: { display: "flex", gap: "12px", justifyContent: "center" },
  helpfulBtn: { padding: "8px 24px", border: "1px solid #d9d9d9", borderRadius: "4px", background: "white", cursor: "pointer", fontSize: "1rem" },
};