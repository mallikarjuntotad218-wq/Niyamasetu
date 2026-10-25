
import { useState, type FormEvent } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";

export function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const cleanEmail = email.trim();

      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, cleanEmail, password);
        setMessage("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, cleanEmail, password);
      }
    } catch (error) {
      const err = error as { code?: string };

      const messages: Record<string, string> = {
        "auth/email-already-in-use":
          "This email is already registered. Please log in.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password":
          "Password must contain at least 6 characters.",
        "auth/invalid-credential": "Incorrect email or password.",
        "auth/user-not-found": "No account found. Please sign up.",
        "auth/wrong-password": "Incorrect password.",
        "auth/too-many-requests":
          "Too many attempts. Please try again later.",
        "auth/network-request-failed":
          "Network error. Check your internet connection.",
        "auth/operation-not-allowed":
          "Enable Email/Password in Firebase Authentication settings.",
        "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
          "Firebase API key is invalid. Check src/firebase.ts.",
      };

      setMessage(
        messages[err.code ?? ""] ??
          `Authentication failed: ${err.code ?? "unknown error"}`
      );
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setMessage("Enter your email address first.");
      return;
    }

    setMessage("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage(
        "Reset email sent. Check your inbox and spam folder."
      );
    } catch (error) {
      const err = error as { code?: string; message?: string };
      console.error("Password reset error:", error);

      setMessage(
        `Reset failed: ${err.code ?? "unknown"} — ${
          err.message ?? "Please check Firebase settings."
        }`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B1530] px-4 py-8">
      <section className="w-full max-w-md rounded-2xl border border-[#C9A44C]/40 bg-[#111F3D] p-8 shadow-2xl">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C9A44C] text-3xl font-bold text-[#0B1530]">
            N
          </div>

          <h1 className="text-3xl font-bold text-white">NiyamSetu</h1>

          <p className="mt-2 text-sm text-slate-300">
            Your bridge to understanding legal notices
          </p>
        </div>

        <h2 className="mb-2 text-xl font-semibold text-white">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h2>

        <p className="mb-6 text-sm text-slate-300">
          {isSignUp
            ? "Create an account to get started."
            : "Log in to access your dashboard."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="niyam-email"
              className="mb-1 block text-sm text-slate-200"
            >
              Email address
            </label>

            <input
              id="niyam-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-600 bg-[#0B1530] px-4 py-3 text-white outline-none focus:border-[#C9A44C]"
            />
          </div>

          <div>
            <label
              htmlFor="niyam-password"
              className="mb-1 block text-sm text-slate-200"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="niyam-password"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                autoComplete={
                  isSignUp ? "new-password" : "current-password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full rounded-lg border border-slate-600 bg-[#0B1530] px-4 py-3 pr-20 text-white outline-none focus:border-[#C9A44C]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="absolute inset-y-0 right-3 text-sm font-semibold text-[#E2C46D] hover:underline"
              >
                {showPassword ? "Hide" : "👁 Show"}
              </button>
            </div>
          </div>

          {!isSignUp && (
            <div className="text-right">
              <button
                type="button"
                disabled={loading}
                onClick={handleForgotPassword}
                className="text-sm text-[#E2C46D] hover:underline disabled:opacity-50"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#C9A44C] px-4 py-3 font-bold text-[#0B1530] transition hover:bg-[#E2C46D] disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : isSignUp
                ? "Create Account"
                : "Log In"}
          </button>
        </form>

        {message && (
          <p
            role="status"
            aria-live="polite"
            className="mt-4 break-words text-center text-sm text-[#E2C46D]"
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-slate-300">
          {isSignUp
            ? "Already have an account? "
            : "New to NiyamSetu? "}

          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setIsSignUp((current) => !current);
              setMessage("");
              setPassword("");
              setShowPassword(false);
            }}
            className="font-semibold text-[#E2C46D] hover:underline"
          >
            {isSignUp ? "Log in" : "Sign up"}
          </button>
        </p>

        <p className="mt-6 text-center text-xs text-slate-400">
          NiyamSetu helps explain notices. It does not replace
          professional legal advice.
        </p>
      </section>
    </main>
  );
}
