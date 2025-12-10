import { GoogleGenAI } from "@google/genai";

// Helper function to get the API key from localStorage
const getApiKey = (): string | null => {
  try {
    return localStorage.getItem('gemini-api-key');
  } catch (error) {
    console.error("Could not access localStorage:", error);
    return null;
  }
};


export const filterContent = async (text: string): Promise<'SAFE' | 'UNSAFE'> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("API_KEY not found in localStorage. Skipping content filter.");
    return 'SAFE';
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Analyze the following text for harmful, abusive, or triggering content. Your response must be a single word: either 'SAFE' or 'UNSAFE'. Do not add any other explanation or punctuation. Text: "${text}"`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const resultText = response.text.trim().toUpperCase();

    if (resultText === 'SAFE' || resultText === 'UNSAFE') {
      return resultText;
    }
    
    console.warn(`Unexpected response from Gemini: "${resultText}". Defaulting to SAFE.`);
    return 'SAFE';
  } catch (error) {
    console.error("Error filtering content with Gemini:", error);
    return 'SAFE';
  }
};

export const analyzeJournalForCrisis = async (text: string): Promise<'CRISIS' | 'HIGH_RISK' | 'LOW_RISK'> => {
  const apiKey = getApiKey();
  if (!apiKey || !text.trim()) {
    return 'LOW_RISK';
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Analyze the following journal entry to determine if it contains language indicating an immediate crisis, such as suicidal ideation, plans of self-harm, or overwhelming hopelessness. Respond with ONLY one of the following words:
- 'CRISIS': If there is explicit mention of suicide, self-harm plans, or a direct statement of wanting to die.
- 'HIGH_RISK': If the text expresses extreme hopelessness, feeling like a burden, or strong feelings of worthlessness, but without an explicit plan.
- 'LOW_RISK': If the text expresses sadness, depression, or anxiety, but does not contain indicators of immediate crisis.

Do not provide any explanation. Your response must be a single word.

Text: "${text}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const resultText = response.text.trim().toUpperCase();

    if (resultText === 'CRISIS' || resultText === 'HIGH_RISK' || resultText === 'LOW_RISK') {
      return resultText;
    }

    console.warn(`Unexpected crisis analysis response: "${resultText}". Defaulting to LOW_RISK.`);
    return 'LOW_RISK';

  } catch (error) {
    console.error("Error analyzing journal for crisis:", error);
    return 'LOW_RISK';
  }
};


export const getEmpatheticMessage = async (): Promise<string> => {
    const apiKey = getApiKey();
    if (!apiKey) {
        return "It's brave of you to acknowledge these feelings. Remember to be gentle with yourself today.";
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = "Generate a short, gentle, and empathetic message for someone who is feeling deeply depressed and has just logged their mood. The message should be validating, non-judgmental, and avoid toxic positivity or giving advice. Focus on acknowledging their pain and offering a sense of quiet support. For example: 'Thank you for sharing. It's okay to not be okay. You are not alone in this.'";

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error fetching empathetic message:", error);
        return "It takes a lot of strength to face these feelings. Please be kind to yourself.";
    }
};