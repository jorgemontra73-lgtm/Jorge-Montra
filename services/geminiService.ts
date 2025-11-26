import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCulturalContext = async (dishName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a short, engaging paragraph (approx 80 words) about the history, cultural significance, and origin of the Angolan dish "${dishName}". Write in Portuguese. Focus on tradition and context.`,
    });
    return response.text || "Informação cultural não disponível no momento.";
  } catch (error) {
    console.error("Error fetching cultural context:", error);
    return "Não foi possível carregar a história deste prato. Tente novamente mais tarde.";
  }
};

export const suggestWinePairing = async (dishName: string, ingredients: string[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Suggest a drink pairing (wine, beer, or traditional Angolan drink like Kissangua) for the dish "${dishName}" which contains ${ingredients.join(', ')}. Explain why in 1 sentence in Portuguese.`,
    });
    return response.text || "";
  } catch (error) {
    return "";
  }
}