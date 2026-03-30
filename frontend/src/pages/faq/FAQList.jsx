import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockFAQs, faqCategories } from "../../api/mockFAQs";
// import API from "../../api/axios";

// Assume this comes from AuthContext — hardcode for now, swap later
const CURRENT_USER_ROLE = "Admin"; // Change to "User" to test non-admin view

export default function FAQList() {
  const [faqs, setFaqs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    // --- MOCK ---
    setFaqs(mockFAQs);

    // --- REAL API (uncomment when backend ready) ---
    // API.get("/knowledge-base/").then(res => setFaqs(res.data));
  }, []);

  const filtered = faqs.filter(faq => {
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = category === "All" || faq.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={{ margin: 0 }}>Knowledge Base</h2>
          <p style={styles.subtitle}>Find answers to common questions</p>
        </div>
        {CURRENT_USER_ROLE === "Admin" && (
          <button style={styles.createBtn} onClick={() => navigate("/faq/create")}>
            + Add FAQ
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div style={styles.searchWrapper}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="Search by keyword, question, or tag..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button style={styles.clearBtn} onClick={() => setSearch("")}>✕</button>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div style={styles.tabs}>
        {faqCategories.map(cat => (
          <button
            key={cat}
            style={{ ...styles.tab, ...(category === cat ? styles.activeTab : {}) }}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p style={styles.resultCount}>
        {filtered.length} {filtered.length === 1 ? "result" : "results"}
        {search && ` for "${search}"`}
        {category !== "All" && ` in ${category}`}
      </p>

      {/* FAQ Cards */}
      {filtered.length === 0 ? (
        <div style={styles.empty}>
          <p>😕 No FAQs found.</p>
          <p style={{ fontSize: "0.9rem", color: "#aaa" }}>Try a different search term or category.</p>
        </div>
      ) : (
        filtered.map(faq => (
          <div
            key={faq.id}
            style={styles.card}
            onClick={() => navigate(`/faq/${faq.id}`)}
          >
            <div style={styles.cardTop}>
              <span style={styles.question}>{faq.question}</span>
              <span style={styles.categoryBadge}>{faq.category}</span>
            </div>
            <p style={styles.answerPreview}>
              {faq.answer.length > 120 ? faq.answer.slice(0, 120) + "..." : faq.answer}
            </p>
            <div style={styles.tags}>
              {faq.tags.map(tag => (
                <span key={tag} style={styles.tag}>#{tag}</span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  page: { padding: "2rem", maxWidth: "900px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" },
  subtitle: { color: "#888", margin: "4px 0 0 0", fontSize: "0.95rem" },
  createBtn: { padding: "8px 16px", background: "#1890ff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", whiteSpace: "nowrap" },
  searchWrapper: { position: "relative", marginBottom: "1.25rem" },
  searchIcon: { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "1rem" },
  searchInput: { width: "100%", padding: "12px 40px 12px 38px", borderRadius: "8px", border: "1px solid #d9d9d9", fontSize: "0.95rem", boxSizing: "border-box", outline: "none" },
  clearBtn: { position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: "1rem" },
  tabs: { display: "flex", gap: "8px", marginBottom: "1rem", flexWrap: "wrap" },
  tab: { padding: "6px 16px", borderRadius: "20px", border: "1px solid #d9d9d9", background: "white", cursor: "pointer", fontSize: "0.9rem" },
  activeTab: { background: "#1890ff", color: "white", border: "1px solid #1890ff" },
  resultCount: { color: "#888", fontSize: "0.85rem", marginBottom: "1rem" },
  empty: { textAlign: "center", padding: "3rem", color: "#888" },
  card: { background: "white", border: "1px solid #e8e8e8", borderRadius: "8px", padding: "1.25rem", marginBottom: "1rem", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.5rem" },
  question: { fontWeight: "600", fontSize: "1rem", flex: 1 },
  categoryBadge: { padding: "3px 10px", background: "#f0f5ff", color: "#1890ff", borderRadius: "12px", fontSize: "0.78rem", fontWeight: "bold", whiteSpace: "nowrap" },
  answerPreview: { color: "#666", fontSize: "0.9rem", margin: "0 0 0.75rem 0", lineHeight: "1.5" },
  tags: { display: "flex", gap: "6px", flexWrap: "wrap" },
  tag: { background: "#f5f5f5", color: "#888", padding: "2px 8px", borderRadius: "4px", fontSize: "0.78rem" },
};