import { GoogleGenAI } from "@google/genai";
import { Book } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getBookRecommendation(userActivity: string, userSegment: string, books: Book[]) {
  try {
    const bookContext = books.map(b => `${b.title} (${b.category}): ${b.description}`).join('\n');
    
    const prompt = `You are an expert librarian assistant for "Perpustakaanku". 
    A user who is a "${userSegment}" has the following activity: "${userActivity}".
    
    Here is our current catalog:
    ${bookContext}
    
    Recommend one specific book from the catalog or provide general guidance on what they should look for next.
    Keep the response concise, encouraging, and tailored to their role.
    If you recommend a book not in the list, briefly explain why it fits their segment.
    Return the response as a friendly message.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Explore our new arrivals to find your next great read!";
  }
}
