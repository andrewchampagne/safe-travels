// components/ChecklistGenerator.tsx
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const GEN_AI = new GoogleGenerativeAI("AIzaSyB79XSfhjb4sxLr0atszjqTtkl6HHoktj8");
const MODEL = GEN_AI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Generation function
async function generateText(prompt: string): Promise<string> {
  const result = await MODEL.generateContent(
    "Given the following info, create a checklist. Only respond in checklist form. " + prompt
  );
  return result.response.text();
}

const ChecklistGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [checklist, setChecklist] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await generateText(prompt);
      setChecklist(response);
    } catch (error) {
      console.error("Error generating checklist:", error);
      setChecklist("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <h2>Checklist Generator</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter info to turn into a checklist..."
        rows={6}
        style={{ width: "100%", padding: "10px", fontSize: "1rem" }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Checklist"}
      </button>
      {checklist && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap", background: "#3f4b49", padding: "1rem", borderRadius: "8px" }}>
          <h3>Generated Checklist:</h3>
          <div>{checklist}</div>
        </div>
      )}
    </div>
  );
};

export default ChecklistGenerator;
