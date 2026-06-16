export const SUMMARY_PROMPT = (currentText: string) => 
  `Rewrite the following professional resume summary to be more concise, impactful, and ATS-friendly in 64 words: "${currentText}". Keep it under 3-4 sentences.`;

export const ATS_PROMPT = (jd: string, resumeText: string) => 
  `Act as an Expert ATS (Applicant Tracking System) Specialist. Analyze the following Resume against the Job Description. 
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
