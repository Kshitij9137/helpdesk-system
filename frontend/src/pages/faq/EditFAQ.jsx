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

  if (!form) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 max-w-[650px] mx-auto">
      <button className="bg-none border-none text-blue-500 cursor-pointer text-base mb-4 p-0" onClick={() => navigate(`/faq/${id}`)}>← Back to FAQ</button>
      <div className="bg-white rounded-lg p-7 shadow-sm">
        <h2>Edit FAQ</h2>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block font-bold mb-1 mt-4">Question</label>
          <input className="w-full p-2.5 rounded border border-gray-300 box-border text-sm" name="question" value={form.question} onChange={handleChange} required />

          <label className="block font-bold mb-1 mt-4">Answer</label>
          <textarea className="w-full p-2.5 rounded border border-gray-300 box-border text-sm h-[140px] resize-y" name="answer" value={form.answer} onChange={handleChange} required />

          <label className="block font-bold mb-1 mt-4">Category</label>
          <select className="w-full p-2.5 rounded border border-gray-300 box-border text-sm" name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>

          <label className="block font-bold mb-1 mt-4">Tags <span className="font-normal text-gray-400 text-xs">(comma separated)</span></label>
          <input className="w-full p-2.5 rounded border border-gray-300 box-border text-sm" name="tags" value={form.tags} onChange={handleChange} />

          <button className="mt-6 w-full p-2.5 bg-yellow-500 text-white border-none rounded cursor-pointer font-bold text-base" type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

