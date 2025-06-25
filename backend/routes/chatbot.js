const express = require("express");
const { retrieveRelevantChunks } = require("../rag/retriever.js");
const { askGemini } = require("../rag/geminichat.js");

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { question } = req.body;

  try {
    const context = await retrieveRelevantChunks(question);
    const answer = await askGemini(question, context);

    res.json({ answer });
  } catch (err) {
    console.error("Error chatbot:", err.message);
    res.status(500).json({ error: "Chatbot error" });
  }
});

module.exports = router;
