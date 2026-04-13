import { Elysia } from "elysia";
import { user } from "./modules/user";

const app = new Elysia({prefix : "/api"})
  .use(user)

console.log(
  `🦊 Elysia is running at ${process.env.PORT ?? 5000}`
);
