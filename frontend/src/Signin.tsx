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
    <main className="flex min-h-dvh items-center justify-center bg-black px-4 py-12 text-zinc-100 sm:px-6">
      <section
        aria-labelledby="signin-heading"
        className="w-full max-w-md overflow-hidden border border-zinc-800 bg-zinc-950 shadow-xl"
      >
        <header className="border-b border-zinc-800 px-6 py-8 sm:px-8">
          <h1
            id="signin-heading"
            className="text-3xl font-bold tracking-tight text-white"
          >
            Sign in
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Welcome back. Enter your details to sign in.
          </p>
        </header>
        <form
          className="space-y-5 p-6 sm:p-8"
          onSubmit={handleSubmit}
          aria-busy={loading}
        >
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-zinc-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="username"
              placeholder="example@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="block w-full border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-white placeholder:text-zinc-500 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-zinc-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password..."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="block w-full border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-white placeholder:text-zinc-500 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-sky-400 px-4 py-3 text-sm font-bold tracking-wide text-zinc-950 transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "SIGN IN"}
          </button>
          <p className="text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link
              className="rounded-sm font-medium text-sky-400 underline-offset-4 hover:text-sky-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
              to="/signup"
            >
              Sign up
            </Link>
          </p>
          <p role="status" className="text-center text-sm text-rose-400 empty:hidden">
            {message}
          </p>
        </form>
      </section>
    </main>
  );
}

export default Signin;
