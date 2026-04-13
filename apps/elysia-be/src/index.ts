import { Elysia } from "elysia";
import { user } from "./modules/user";

const app = new Elysia({prefix : "/api"})
  .use(user).listen(8000, function(){
    console.log("server is running on port 8000")
  })

console.log(
  `🦊 Elysia is running at ${process.env.PORT ?? 5000}`
);
