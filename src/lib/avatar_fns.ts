import { supabase } from "@lib/supabaseClient";

export async function fetchAvatarData(path: string) {
  return await supabase.storage.from("avatars").download(path);
}

export async function uploadAvtarData(filePath: string, file: File) {
  return await supabase.storage.from("avatars").upload(filePath, file);
}
