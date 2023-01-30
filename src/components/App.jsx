import { useState, useEffect } from "react";
import { supabase } from "@lib/supabaseClient";
import { getSession } from "@lib/auth_fns";
import Account from "@components/Account";
import Auth from "@components/Auth";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container py-4 px-0">
      {!session ? <Auth /> : <Account session={session} />}
    </div>
  );
}
