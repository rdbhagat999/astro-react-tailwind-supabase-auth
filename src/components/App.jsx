import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Account from "./Account";
import Auth from "./Auth";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container py-4 px-0">
      {!session ? (
        <Auth />
      ) : (
        <Account userId={session.user.id} session={session} />
      )}
    </div>
  );
}
