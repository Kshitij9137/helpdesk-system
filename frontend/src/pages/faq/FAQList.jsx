import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// ✅ FIX: Added missing imports
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import { faqCategories } from "../../api/mockFAQs";

export default function FAQList() {
  // ✅ FIX: moved useAuth() INSIDE the component function
  const { user } = useAuth();
  const CURRENT_USER_ROLE = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "User";

  const [faqs, setFaqs]         = useState([]);
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/knowledge/faqs/").then(res => setFaqs(res.data))
      .catch(() => console.error("Failed to fetch FAQs"));
  }, []);

  const filtered = faqs.filter(faq => {
    const tags = Array.isArray(faq.tags)
      ? faq.tags
      : (faq.tags || "").split(",").map(t => t.trim());

    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase()) ||
      tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

    const faqCategory = typeof faq.category === "object"
      ? faq.category?.name
      : faq.category;

    const matchesCategory = category === "All" || faqCategory === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="m-0">Knowledge Base</h2>
          <p className="text-gray-500 m-0 mt-1 text-sm">Find answers to common questions</p>
        </div>
        {CURRENT_USER_ROLE === "Admin" && (
          <button
            className="p-2 px-4 bg-blue-500 text-white border-none rounded cursor-pointer font-bold whitespace-nowrap"
            onClick={() => navigate("/faq/create")}
          >
            + Add FAQ
          </button>
        )}
      </div>

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
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-400 text-base"
            onClick={() => setSearch("")}
          >✕</button>
        )}
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {faqCategories.map(cat => (
          <button
            key={cat}
            className={`p-1.5 px-4 rounded-full border cursor-pointer text-sm transition-colors ${
              category === cat
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="text-gray-400 text-xs mb-4">
        {filtered.length} {filtered.length === 1 ? "result" : "results"}
        {search && ` for "${search}"`}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>😕 No FAQs found.</p>
          <p className="text-sm mt-1">Try a different search term or category.</p>
        </div>
      ) : (
        filtered.map(faq => {
          const tags = Array.isArray(faq.tags)
            ? faq.tags
            : (faq.tags || "").split(",").map(t => t.trim()).filter(Boolean);

          const categoryName = typeof faq.category === "object"
            ? faq.category?.name
            : faq.category;

          return (
            <div
              key={faq.id}
              className="bg-white border border-gray-200 rounded-lg p-5 mb-4 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              onClick={() => navigate(`/faq/${faq.id}`)}
            >
              <div className="flex justify-between items-start gap-4 mb-2">
                <span className="font-semibold text-base flex-1">{faq.question}</span>
                <span className="px-2.5 py-1 bg-blue-50 text-blue-500 rounded-full text-xs font-bold whitespace-nowrap">
                  {categoryName}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                {faq.answer.length > 120 ? faq.answer.slice(0, 120) + "..." : faq.answer}
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-400 px-2 py-0.5 rounded text-xs">#{tag}</span>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}