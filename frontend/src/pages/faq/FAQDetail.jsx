import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// ✅ FIX: Added missing imports, removed mock import
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";

export default function FAQDetail() {
  const { id } = useParams();
  const [faq, setFaq]         = useState(null);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  // ✅ FIX: useAuth inside component
  const { user } = useAuth();
  const CURRENT_USER_ROLE = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "User";

  useEffect(() => {
    API.get(`/knowledge/faqs/${id}/`)
      .then(res => setFaq(res.data))
      .catch(() => console.error("Failed to fetch FAQ"));
  }, [id]);

  // ✅ FIX: added async keyword to handleDelete
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await API.delete(`/knowledge/faqs/${id}/`);
      setDeleted(true);
      setTimeout(() => navigate("/faq"), 1500);
    } catch {
      alert("Failed to delete FAQ.");
    }
  };

  if (deleted) return <p className="p-8 text-red-500">FAQ deleted. Redirecting...</p>;
  if (!faq)    return <p className="p-8 text-gray-400">Loading FAQ...</p>;

  // ✅ FIX: handle tags whether they come as array or comma string
  const tags = Array.isArray(faq.tags)
    ? faq.tags
    : (faq.tags || "").split(",").map(t => t.trim()).filter(Boolean);

  const categoryName = typeof faq.category === "object"
    ? faq.category?.name
    : faq.category;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button
        className="bg-transparent border-none text-blue-500 cursor-pointer text-base mb-4 p-0"
        onClick={() => navigate("/faq")}
      >
        ← Back to Knowledge Base
      </button>

      <div className="bg-white rounded-lg p-7 shadow-sm">
        <div className="flex items-center gap-2.5 flex-wrap mb-4">
          <span className="px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-xs font-bold">
            {categoryName}
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs">#{tag}</span>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-bold mb-2 text-gray-800">{faq.question}</h2>
        <hr className="my-4" />
        <p className="text-base text-gray-600 leading-relaxed">{faq.answer}</p>

        {CURRENT_USER_ROLE === "Admin" && (
          <div className="flex gap-2.5 mt-6">
            <button
              className="p-2 px-5 bg-yellow-500 border-none rounded cursor-pointer font-bold"
              onClick={() => navigate(`/faq/${faq.id}/edit`)}
            >
              ✏️ Edit
            </button>
            <button
              className="p-2 px-5 bg-red-500 text-white border-none rounded cursor-pointer font-bold"
              onClick={handleDelete}
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 bg-white rounded-lg p-5 shadow-sm text-center">
        <p className="m-0 mb-2 font-bold">Was this helpful?</p>
        <div className="flex gap-3 justify-center">
          <button className="p-2 px-6 border border-gray-300 rounded bg-white cursor-pointer text-base">👍 Yes</button>
          <button className="p-2 px-6 border border-gray-300 rounded bg-white cursor-pointer text-base">👎 No</button>
        </div>
      </div>
    </div>
  );
}