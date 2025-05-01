// server.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000;

const API_KEY = "q9z8sw8t9gtxt9nkfqtq4r7t";

app.get("/api/country/:code", async (req, res) => {
  const code = req.params.code.toUpperCase();
  try {
    const response = await fetch(`https://api.tugo.com/v1/travelsafe/countries/${code}`, {
      headers: { "X-API-Key": API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data from TuGo" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
