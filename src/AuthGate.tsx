
import { useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";
import { AuthScreen } from "./AuthScreen";

export function AuthGate({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return unsubscribe;
  }, []);

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Unable to log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B1530] text-white">
        Checking login...
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <>
      <div className="flex items-center justify-end gap-3 border-b border-[#C9A44C]/30 bg-[#0B1530] px-5 py-3 text-white">
        <span className="max-w-[200px] truncate text-sm">
          {user.email}
        </span>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="rounded-lg bg-[#C9A44C] px-4 py-2 font-semibold text-[#0B1530] hover:bg-[#E2C46D] disabled:opacity-60"
        >
          {loggingOut ? "Logging out..." : "Log Out"}
        </button>
      </div>

      {children}
    </>
  );
}
