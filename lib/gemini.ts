import { GoogleGenAI, Modality } from "@google/genai";

export const generateHeroImage = async (): Promise<string> => {
  try {
    // Create a new GoogleGenAI instance for the API call.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // This model is also known as 'nano banana'
      contents: {
        parts: [
          {
            text: 'An abstract, visually appealing image representing the concept of earning money online through surveys and tasks. The image should incorporate elements like dollar signs, coins, or cash in a modern and sophisticated style. The color palette should be dark with glowing blue and green highlights to match the website UI.',
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE], // We expect an image in response.
      },
    });

    // Extract the base64 image data from the response.
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }
    
    // If no image data is found, return a fallback image.
    console.warn('No image data found in Gemini response. Using fallback.');
    return 'https://i.imgur.com/8aM0L2d.jpeg';

  } catch (error) {
    console.error("Error generating hero image with Gemini:", error);
    // In case of an API error, return a fallback image to ensure the UI doesn't break.
    return 'https://i.imgur.com/8aM0L2d.jpeg';
  }
};
