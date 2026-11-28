import axios from "axios";
import { useState, type FormEvent } from "react";
import api from "./api.ts";
import { Link, useNavigate } from "react-router";

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
    <main className="flex min-h-dvh items-center justify-center bg-black px-4 py-12 text-zinc-100 sm:px-6">
      <section
        aria-labelledby="signup-heading"
        className="w-full max-w-md overflow-hidden border border-zinc-800 bg-zinc-950 shadow-xl"
      >
        <header className="border-b border-zinc-800 px-6 py-8 sm:px-8">
          <h1 id="signup-heading" className="text-3xl font-bold tracking-tight text-white">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Enter your details to get started.
          </p>
        </header>
        <form className="space-y-5 p-6 sm:p-8" onSubmit={handleSubmit} aria-busy={loading}>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-200">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-white placeholder:text-zinc-500 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-zinc-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
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
              autoComplete="new-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-white placeholder:text-zinc-500 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-sky-400 px-4 py-3 text-sm font-bold tracking-wide text-zinc-950 transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating your account..." : "CREATE ACCOUNT"}
          </button>
          <p className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link className="rounded-sm font-medium text-sky-400 underline-offset-4 hover:text-sky-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400" to="/signin">
              Sign in
            </Link>
          </p>

          <p role="status" className="text-center text-sm text-rose-400 empty:hidden">{message}</p>
        </form>
      </section>
    </main>
  );
}

export default Signup;
