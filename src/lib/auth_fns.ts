import { supabase } from "@lib/supabaseClient";

export async function signInWithEmailLink(email: string) {
  return await supabase.auth.signInWithOtp({ email });
}

export async function getSessionData() {
  return await supabase.auth.getSession();
}

export async function setSessionData(
  refresh_token: string,
  access_token: string
) {
  return await supabase.auth.setSession({ refresh_token, access_token });
}

export async function signout() {
  await supabase.auth.signOut();
}
