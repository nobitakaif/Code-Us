import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL, PROMPTS } from "../../constants/gemini";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export async function* GeminiReponse(userCode : string) {
  const response = await ai.models.generateContentStream({
    model: GEMINI_MODEL,
    contents:  `You are a code converter. The user will give you code in any programming language.

        Your job is to convert that code to these 5 languages: cpp, python, javascript, go, rust, java.

        You MUST respond with ONLY a raw JSON object. No explanation, no markdown, no backticks, no \`\`\`json fence.
        Just the pure JSON object and nothing else.

        The response format must be exactly this:
        {
        "cpp": "the converted c++ code here",
        "python": "the converted python code here", 
        "javascript": "the converted javascript code here",
        "go": "the converted go code here",
        "rust": "the converted rust code here",
        "java": "the converted java code here"
        }

        Rules:
        - Keep the logic identical, just convert the syntax
        - If a language does not support something, write the closest equivalent
        - Never add any text before or after the JSON object
        - Escape all newlines as \\n and all quotes properly inside strings;

        Convert this  code to all 6 languages: [c++, java, python, rust, golang, php]

            ${userCode}`
        })
  for await (const chunk of response){
    if(chunk.text){
        // process.stdout.write(chunk.text)
      yield chunk.text
      
    }
  }
}

GeminiReponse('console.log("alright")')