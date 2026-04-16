import { GeminiReponse } from "./gemini";
import { CodeModel } from "./model";


export abstract class CodeConversation{
    static async code(userCode : string){
      console.log("reached here also")
      const res = GeminiReponse(userCode)
      return res
    }
    
}