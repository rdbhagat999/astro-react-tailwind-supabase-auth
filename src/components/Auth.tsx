import { useState } from "react";
import { signInWithEmailLink } from "@lib/auth_fns";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await signInWithEmailLink(email);
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error?.error_description || error?.message);
    } finally {
      setEmail("");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="text-3xl">Supabase + React</h1>
        <p className="mt-2 mb-6">
          Sign in via magic link with your email below
        </p>
        {loading ? (
          <p className="mt-2 mb-6">Sending magic link...</p>
        ) : (
          <form onSubmit={handleLogin}>
            <input
              id="email"
              className="px-3 py-2 w-full rounded text-gray-100 bg-gray-800"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="block mt-8 px-3 py-2 w-full text-white border rounded hover:border-2"
              aria-live="polite"
            >
              Send magic link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
