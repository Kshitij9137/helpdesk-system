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
    <div className="p-8 max-w-[900px] mx-auto">

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="m-0">Knowledge Base</h2>
          <p className="text-gray-500 m-0 mt-1 text-sm">Find answers to common questions</p>
        </div>
        {CURRENT_USER_ROLE === "Admin" && (
          <button className="p-2 px-4 bg-blue-500 text-white border-none rounded cursor-pointer font-bold whitespace-nowrap" onClick={() => navigate("/faq/create")}>
            + Add FAQ
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative mb-5">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base">🔍</span>
        <input
          className="w-full p-3 px-10 rounded-lg border border-gray-300 text-sm box-border outline-none"
          type="text"
          placeholder="Search by keyword, question, or tag..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-none border-none cursor-pointer text-gray-400 text-base" onClick={() => setSearch("")}>✕</button>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {faqCategories.map(cat => (
          <button
            key={cat}
            className={`p-1.5 px-4 rounded-full border border-gray-300 bg-white cursor-pointer text-sm ${category === cat ? 'bg-blue-500 text-white border-blue-500' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-gray-500 text-xs mb-4">
        {filtered.length} {filtered.length === 1 ? "result" : "results"}
        {search && ` for "${search}"`}
        {category !== "All" && ` in ${category}`}
      </p>

      {/* FAQ Cards */}
      {filtered.length === 0 ? (
        <div className="text-center p-12 text-gray-500">
          <p>😕 No FAQs found.</p>
          <p className="text-sm text-gray-400">Try a different search term or category.</p>
        </div>
      ) : (
        filtered.map(faq => (
          <div
            key={faq.id}
            className="bg-white border border-gray-200 rounded-lg p-5 mb-4 cursor-pointer shadow-sm"
            onClick={() => navigate(`/faq/${faq.id}`)}
          >
            <div className="flex justify-between items-start gap-4 mb-2">
              <span className="font-semibold text-base flex-1">{faq.question}</span>
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-500 rounded-full text-xs font-bold whitespace-nowrap">{faq.category}</span>
            </div>
            <p className="text-gray-600 text-sm m-0 mb-3 leading-relaxed">
              {faq.answer.length > 120 ? faq.answer.slice(0, 120) + "..." : faq.answer}
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {faq.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs">#{tag}</span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

