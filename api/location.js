export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { latitude, longitude, firstName, lastName, email } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Missing coordinates" });
  }

  const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
  console.log("📥 Submission:", { firstName, lastName, email, link });

  res.status(200).json({ message: "Received" });
}
