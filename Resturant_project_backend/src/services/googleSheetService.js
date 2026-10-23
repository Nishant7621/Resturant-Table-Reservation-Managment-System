import dotenv from "dotenv";
dotenv.config();

export const sendToGoogleSheet = async (payload) => {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    // Send in background without blocking API
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => {
      console.warn("Google Sheet webhook notice:", err.message);
    });
  } catch (err) {
    console.warn("Google Sheet sync notice:", err.message);
  }
};

export default sendToGoogleSheet;
