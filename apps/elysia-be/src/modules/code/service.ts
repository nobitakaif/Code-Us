import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL, PROMPTS } from "../../constants/gemini";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: PROMPTS
  })
  console.log(JSON.parse(response.text!))
}
main()