import Elysia from "elysia";
import { CodeModel } from "./model";
import { CodeConversation } from "./service";


export const codeRoute = new Elysia({prefix : "/code"})
  .post("/",async ({body}) => {
    console.log("reached here -> ", body.code)
    const { code } = body
    const res = await CodeConversation.code(code)

    // console.log("reposne -> ",res)
    return res
    
  },{
    body : CodeModel.userCode,
    
  })