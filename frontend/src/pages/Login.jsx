import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // --- MOCK (remove when backend is ready) ---
      if (email === "test@test.com" && password === "1234") {
        login({ access: "fake-access-token", refresh: "fake-refresh-token" });
        navigate("/dashboard");
        return;
      }
      // --- REAL API call (uncomment when backend is ready) ---
      // const res = await API.post("/auth/login/", { email, password });
      // login(res.data);
      // navigate("/dashboard");

      setError("Invalid credentials"); // remove this line when using real API
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button style={styles.button} type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" },
  card: { background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", width: "350px" },
  input: { width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" },
  button: { width: "100%", padding: "10px", background: "#1890ff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  error: { color: "red", marginBottom: "1rem" },
};