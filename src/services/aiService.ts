import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateStylingAdvice(params: {
  skinTone: string;
  bodyType: string;
  eventType: string;
  budget: string;
}) {
  const prompt = `As an expert Indian wedding stylist, provide a detailed look recommendation for a client with:
  Skin Tone: ${params.skinTone}
  Body Type: ${params.bodyType}
  Event Type: ${params.eventType}
  Budget Range: ${params.budget}
  
  Please provide:
  1. Outfit Suggestion (e.g., specific type of Lehenga, Sherwani, or Saree)
  2. Color Palette (specific shades that suit the skin tone)
  3. Jewelry Suggestions
  4. Makeup Style
  5. Footwear Recommendation
  
  Format the response in clear Markdown.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Sorry, I couldn't generate a look right now. Please try again later.";
  }
}
