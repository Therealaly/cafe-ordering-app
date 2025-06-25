import fs from "fs";
import axios from "axios";

// teks berisi informasi tentang cafe
const knowledgePath = "./rag/cafe_knowledge.txt";
const RAG_API_URL = "http://localhost:8001/retrieve";

export const retrieveRelevantChunks = async (query) => {
  let ragContext = []
  try {
    const response = await axios.post(RAG_API_URL, {question: query});
    ragContext = response.data.context || [];
  } catch (error) {
    console.error("Error retrieving context:", error.message);
  }

  const allText = fs.readFileSync(knowledgePath, "utf8");
  const lines = allText.split(/\r?\n/).filter(line => line.trim().length > 0);
  const lowerQuery = query.toLowerCase();

  const relevant = lines.filter(line =>
    lowerQuery.split(" ").some(word => line.toLowerCase().includes(word))
  ).slice(0, 5); // Ambil 5 kalimat yang cocok

  return [...ragContext, ...relevant];
};
