import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.post("/api/analyze", async (req, res) => {
 try {
 const key = process.env.GEMINI_API_KEY;
 if (!key) return res.status(500).json({ error: "Missing GEMINI_API_KEY" });

 const { prompt } = req.body || {};
 if (!prompt) return res.status(400).json({ error: "Missing prompt" });

 const genAI = new GoogleGenerativeAI(key);
 const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

 const result = await model.generateContent(prompt);
 return res.json({ text: result.response.text() });
 } catch {
 return res.status(500).json({ error: "Analyze failed" });
 }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API listening on ${port}`));
