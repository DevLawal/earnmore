// api/location.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Missing coordinates" });
  }

  const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

  console.log("📍 Location received:", {
    latitude,
    longitude,
    timestamp: new Date().toISOString(),
    link: mapLink,
  });

  // Respond with the link
  res.status(200).json({ message: "Location received", link: mapLink });
}
