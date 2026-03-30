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
    <div className="p-8 max-w-[650px] mx-auto">
      <button className="bg-none border-none text-blue-500 cursor-pointer text-base mb-4 p-0" onClick={() => navigate("/faq")}>← Back to Knowledge Base</button>
      <div className="bg-white rounded-lg p-7 shadow-sm">
        <h2>Add New FAQ</h2>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block font-bold mb-1 mt-4">Question</label>
          <input
            className="w-full p-2.5 rounded border border-gray-300 box-border text-sm"
            name="question"
            placeholder="e.g. How do I reset my password?"
            value={form.question}
            onChange={handleChange}
            required
          />

          <label className="block font-bold mb-1 mt-4">Answer</label>
          <textarea
            className="w-full p-2.5 rounded border border-gray-300 box-border text-sm h-[140px] resize-y"
            name="answer"
            placeholder="Write a clear, helpful answer..."
            value={form.answer}
            onChange={handleChange}
            required
          />

          <label className="block font-bold mb-1 mt-4">Category</label>
          <select className="w-full p-2.5 rounded border border-gray-300 box-border text-sm" name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>

          <label className="block font-bold mb-1 mt-4">Tags <span className="font-normal text-gray-400 text-xs">(comma separated, e.g. login, password, account)</span></label>
          <input
            className="w-full p-2.5 rounded border border-gray-300 box-border text-sm"
            name="tags"
            placeholder="login, password, account"
            value={form.tags}
            onChange={handleChange}
          />

          <button className="mt-6 w-full p-2.5 bg-green-500 text-white border-none rounded cursor-pointer font-bold text-base" type="submit">Create FAQ</button>
        </form>
      </div>
    </div>
  );
}

