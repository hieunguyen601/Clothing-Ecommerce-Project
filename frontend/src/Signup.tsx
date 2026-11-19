import axios from "axios";
import { useState, type FormEvent } from "react";
import api from "./api.ts";
import { useNavigate } from "react-router";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage("");
    try {
      const response = await api.post<{ message: string }>("/signup", {
        name,
        email,
        password,
      });
      setMessage(response.data.message);
      navigate("/signin");
    } catch (error) {
      setMessage(
        axios.isAxiosError<{ message?: string }>(error)
          ? (error.response?.data?.message ?? "Unable to reach the server.")
          : "Something wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Henry Nguyen"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="signUp-btn">
          {loading ? "Creating your account..." : "Sign Up"}
        </button>

        <p role="status">{message}</p>
      </form>
    </>
  );
}

export default Signup;
