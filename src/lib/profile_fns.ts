import { supabase } from "@lib/supabaseClient";

export async function fetchProfileDataById(userId: string) {
  return await supabase
    .from("profiles")
    .select(`username, website, avatar_url`)
    .eq("id", userId)
    .single();
}

export async function updateProfileData(updates: any) {
  return await supabase.from("profiles").upsert(updates);
}
