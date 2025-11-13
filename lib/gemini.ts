import { GoogleGenAI, Modality } from "@google/genai";

// Reusable function to generate a single image from a prompt.
const generateSingleImage = async (prompt: string, fallback: string): Promise<string> => {
  try {
    // Create a new GoogleGenAI instance for each API call.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }
    
    console.warn('No image data found in Gemini response. Using fallback.');
    return fallback;

  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    return fallback;
  }
};


export const generateHeroImage = async (): Promise<string> => {
  const prompt = 'An abstract, visually appealing image representing the concept of earning money online through surveys and tasks. The image should incorporate elements like dollar signs, coins, or cash in a modern and sophisticated style. The color palette should be dark with glowing blue and green highlights to match the website UI.';
  const fallback = 'https://i.imgur.com/8aM0L2d.jpeg';
  return generateSingleImage(prompt, fallback);
};

export const generateHowItWorksImages = async (): Promise<string[]> => {
    const prompts = [
        'An abstract, minimalist image representing "Sign Up". Use clean lines and shapes, possibly depicting a stylized user profile icon or a simple registration form. The color palette should be dark with glowing blue and green highlights.',
        'An abstract, dynamic image representing "Complete Tasks". Use elements like checkmarks, progress bars, or interlocking gears to convey a sense of accomplishment and efficiency. The color palette should be dark with glowing blue and green highlights.',
        'An abstract, rewarding image representing "Get Paid". Use visuals like radiating coins, digital currency symbols, or light flowing into a wallet icon to symbolize earnings. The color palette should be dark with glowing blue and green highlights.'
    ];
    const fallbacks = [
        'https://i.imgur.com/T0bC2zZ.jpeg',
        'https://i.imgur.com/4l3z4P4.jpeg',
        'https://i.imgur.com/uJgJa8Z.jpeg'
    ];

    const imagePromises = prompts.map((prompt, index) => generateSingleImage(prompt, fallbacks[index]));
    
    return Promise.all(imagePromises);
};
