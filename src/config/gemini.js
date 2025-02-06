import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = "AIzaSyCA-FbfHC-z_EUPDXuNfKMqUWbEOpM6rn8";

// Add error checking for API key
if (!API_KEY) {
  throw new Error("API key is not set");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Create these outside of any component
const generationConfig = {
  temperature: 0.9,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 2048,
};

// Create a single chat session that can be reused
const chatSession = model.startChat({
  generationConfig,
  history: [],
});

// Modify the run function to be more stable
async function run(prompt) {
  try {
    if (!prompt) {
      throw new Error("Prompt is required");
    }

    const result = await chatSession.sendMessage(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error in Gemini API call:", error);
    // Return a user-friendly error message
    return "Sorry, there was an error connecting to the AI service. Please try again later.";
  }
}

export default run;
