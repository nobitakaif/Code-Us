import { Elysia } from "elysia";
import { user } from "./modules/user";
import { codeRoute } from "./modules/code";

const app = new Elysia({prefix : "/api"})
  .use(user)
  .use(codeRoute)
  .listen(8000, function(){
    console.log("server is running on port 8000")
  })

  

export type App = typeof app