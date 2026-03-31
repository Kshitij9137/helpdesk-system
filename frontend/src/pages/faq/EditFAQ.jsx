import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// ✅ FIX: removed mock import, added real API import
import API from "../../api/axios";

const CATEGORIES = ["Account", "Tickets", "Privacy"];

export default function EditFAQ() {
  const { id } = useParams();
  const [form, setForm]     = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError]   = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ FIX: using real API
    API.get(`/knowledge/faqs/${id}/`).then(res => {
      const data = res.data;
      const tags = Array.isArray(data.tags)
        ? data.tags.join(", ")
        : (data.tags || "");
      setForm({ ...data, tags });
    }).catch(() => setError("Failed to load FAQ."));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.patch(`/knowledge/faqs/${id}/`, {
        question:     form.question,
        answer:       form.answer,
        tags:         form.tags,
        is_published: true,
      });
      setSuccess("FAQ updated successfully!");
      setTimeout(() => navigate(`/faq/${id}`), 1500);
    } catch {
      setError("Failed to update FAQ.");
    }
  };

  if (!form) return <p className="p-8 text-gray-400">Loading...</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button
        className="bg-transparent border-none text-blue-500 cursor-pointer text-base mb-4 p-0"
        onClick={() => navigate(`/faq/${id}`)}
      >
        ← Back to FAQ
      </button>
      <div className="bg-white rounded-lg p-7 shadow-sm">
        <h2>Edit FAQ</h2>
        {success && <p className="text-green-500">{success}</p>}
        {error   && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block font-bold mb-1 mt-4">Question</label>
          <input
            className="w-full p-2.5 rounded border border-gray-300 box-border text-sm"
            name="question" value={form.question} onChange={handleChange} required
          />

          <label className="block font-bold mb-1 mt-4">Answer</label>
          <textarea
            className="w-full p-2.5 rounded border border-gray-300 box-border text-sm h-36 resize-y"
            name="answer" value={form.answer} onChange={handleChange} required
          />

          <label className="block font-bold mb-1 mt-4">Category</label>
          <select
            className="w-full p-2.5 rounded border border-gray-300 box-border text-sm"
            name="category" value={form.category} onChange={handleChange}
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>

          <label className="block font-bold mb-1 mt-4">
            Tags <span className="font-normal text-gray-400 text-xs">(comma separated)</span>
          </label>
          <input
            className="w-full p-2.5 rounded border border-gray-300 box-border text-sm"
            name="tags" value={form.tags} onChange={handleChange}
          />

          <button
            className="mt-6 w-full p-2.5 bg-yellow-500 text-white border-none rounded cursor-pointer font-bold text-base"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}