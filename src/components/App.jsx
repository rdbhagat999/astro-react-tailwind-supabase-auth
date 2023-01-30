import { useState, useEffect } from "react";
import { supabase } from "@lib/supabaseClient";
import { getSessionData } from "@lib/auth_fns";
import Account from "@components/Account";
import Auth from "@components/Auth";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSessionData().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "SIGNED_OUT" || _event === "USER_DELETED") {
        // delete cookies on sign out
        const expires = new Date(0).toUTCString();
        document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
        document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
      } else if (_event === "SIGNED_IN" || _event === "TOKEN_REFRESHED") {
        const maxAge = 15 * 24 * 60 * 60; // 15 days, never expires
        document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
        document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
      }
      setSession(session);
    });
  }, []);

  return (
    <div className="container py-4 px-0">
      {!session ? <Auth /> : <Account session={session} />}
    </div>
  );
}
