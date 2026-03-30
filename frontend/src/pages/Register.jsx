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
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Register</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input style={styles.input} name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input style={styles.input} name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button style={styles.button} type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" },
  card: { background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", width: "350px" },
  input: { width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" },
  button: { width: "100%", padding: "10px", background: "#52c41a", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  error: { color: "red" },
  success: { color: "green" },
};