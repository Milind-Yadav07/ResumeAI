import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("VITE_GEMINI_API_KEY present:", !!import.meta.env.VITE_GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getAISummary = async (currentText) => {
  console.log("getAISummary called with:", currentText);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Rewrite the following professional resume summary to be more concise, impactful, and ATS-friendly in 64 words: "${currentText}". Keep it under 3-4 sentences.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Failed to generate AI content. Please check your API key.";
  }
};

export const checkATSScore = async (jd, resumeText) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Act as an Expert ATS (Applicant Tracking System) Specialist. Analyze the following Resume against the Job Description. 
    Provide a high-quality, professional analysis in the following JSON format ONLY:
    {
      "matchPercentage": number,
      "matchLevel": "Weak Match" | "Average Match" | "Good Match" | "Strong Match",
      "matchDescription": "string (A one sentence summary of the match quality)",
      "foundKeywords": ["string"],
      "missingKeywords": ["string"],
      "quickTips": [
        {
          "type": "success" | "warning" | "tip",
          "text": "string"
        }
      ]
    }
    
    Job Description: ${jd}
    Resume Content: ${resumeText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from potential markdown code blocks
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonText = jsonMatch ? jsonMatch[0] : text;

    try {
      return JSON.parse(jsonText);
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", text);
      return {
        matchPercentage: 0,
        matchLevel: "Error",
        matchDescription: "Failed to parse analysis.",
        foundKeywords: [],
        missingKeywords: [],
        quickTips: [{ type: "warning", text: "Error parsing AI response. Please try again." }]
      };
    }
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return {
      matchPercentage: 0,
      matchLevel: "Error",
      matchDescription: "Analysis failed.",
      foundKeywords: [],
      missingKeywords: [],
      quickTips: [{ type: "warning", text: "Failed to connect to AI service." }]
    };
  }
};
