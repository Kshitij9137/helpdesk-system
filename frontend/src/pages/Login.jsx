import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // --- MOCK ---
      await new Promise(r => setTimeout(r, 800)); // fake network delay
      if (email === "test@test.com" && password === "1234") {
        login({ access: "fake-access-token", refresh: "fake-refresh-token" });
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }

      // --- REAL API (uncomment when backend ready) ---
      // const res = await API.post("/auth/login/", { email, password });
      // login(res.data);
      // navigate("/dashboard");
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-sm p-8">

        {/* Logo */}
        <div className="text-center mb-6">
          <span className="text-4xl">🎧</span>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">HelpDesk</h2>
          <p className="text-sm text-gray-400 mt-1">Sign in to your account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5 mb-4">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}