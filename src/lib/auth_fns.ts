import { supabase } from "@lib/supabaseClient";

export async function signInWithOtp(email: string) {
  return await supabase.auth.signInWithOtp({ email });
}

export async function getSession() {
  return await supabase.auth.getSession();
}

export async function signout() {
  await supabase.auth.signOut();
}
