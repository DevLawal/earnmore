import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { latitude, longitude, firstName, lastName, email } = req.body;

    if (!latitude || !longitude || !firstName || !lastName || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const { error } = await supabase
      .from("submissions")
      .insert([{ firstName, lastName, email, latitude, longitude }]);

    if (error)
      return res.status(500).json({ message: "DB insert failed", error });

    return res.status(200).json({ message: "Received" });
  }

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ message: "Fetch failed", error });

    return res.status(200).json({ submissions: data });
  }

  return res.status(405).json({ message: "Only POST and GET allowed" });
}
