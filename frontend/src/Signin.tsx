import axios from "axios";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import api from "./api";
import { useAuth } from "./AuthContext";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post<{ message: string; data: string }>(
        "/signin",
        { email: email.trim(), password },
      );

      if (typeof response.data.data !== "string" || !response.data.data) {
        setMessage("Unable to sign in. Please try again.");
        return;
      }

      login(response.data.data);
      navigate("/", { replace: true });
    } catch (error) {
      setMessage(
        axios.isAxiosError<{ message?: string }>(error)
          ? (error.response?.data?.message ?? "Unable to reach the server.")
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="username"
          placeholder="example@gmail.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password..."
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <p role="status">{message}</p>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </form>
  );
}

export default Signin;
