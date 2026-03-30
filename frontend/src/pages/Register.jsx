import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // --- MOCK (remove when backend is ready) ---
      setSuccess("Registered successfully! Please login.");
      setTimeout(() => navigate("/login"), 1500);

      // --- REAL API call (uncomment when backend is ready) ---
      // await API.post("/auth/register/", form);
      // setSuccess("Registered successfully! Please login.");
      // setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-87.5">
        <h2>Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input className="w-full p-2.5 mb-4 rounded border border-gray-300 box-border" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input className="w-full p-2.5 mb-4 rounded border border-gray-300 box-border" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input className="w-full p-2.5 mb-4 rounded border border-gray-300 box-border" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button className="w-full p-2.5 bg-green-500 text-white border-none rounded cursor-pointer" type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

