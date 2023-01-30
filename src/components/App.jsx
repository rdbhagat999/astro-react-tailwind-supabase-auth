import { useState, useEffect } from "react";
import { supabase } from "@lib/supabaseClient";

import Account from "@components/Account";
import Auth from "@components/Auth";

export default function App({ session_data }) {
  const [session, setSession] = useState(session_data);

  useEffect(() => {
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
