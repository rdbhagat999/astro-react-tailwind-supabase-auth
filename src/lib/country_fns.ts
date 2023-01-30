import { supabase } from "@lib/supabaseClient";

export async function getCountries() {
  const { data } = await supabase.from("countries").select();
  return {
    countries: data ?? [],
  };
}
