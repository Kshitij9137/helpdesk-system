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

  if (deleted) return <p className="p-8 text-red-500">FAQ deleted. Redirecting...</p>;
  if (!faq) return <p className="p-8">FAQ not found.</p>;

  return (
    <div className="p-8 max-w-[750px] mx-auto">
      <button className="bg-none border-none text-blue-500 cursor-pointer text-base mb-4 p-0" onClick={() => navigate("/faq")}>← Back to Knowledge Base</button>

      <div className="bg-white rounded-lg p-7 shadow-sm">

        {/* Category + Tags */}
        <div className="flex items-center gap-2.5 flex-wrap mb-4">
          <span className="px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-xs font-bold">{faq.category}</span>
          <div className="flex gap-1.5 flex-wrap">
            {faq.tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs">#{tag}</span>
            ))}
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold m-0 mb-2 text-gray-800">{faq.question}</h2>

        <hr className="m-4 m-0" />

        {/* Answer */}
        <p className="text-base text-gray-600 leading-[1.8] m-0">{faq.answer}</p>

        {/* Admin Actions */}
        {CURRENT_USER_ROLE === "Admin" && (
          <div className="flex gap-2.5 mt-6">
            <button
              className="p-2 px-5 bg-yellow-500 border-none rounded cursor-pointer font-bold"
              onClick={() => navigate(`/faq/${faq.id}/edit`)}
            >
              ✏️ Edit
            </button>
            <button className="p-2 px-5 bg-red-500 text-white border-none rounded cursor-pointer font-bold" onClick={handleDelete}>
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      {/* Was this helpful? */}
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

