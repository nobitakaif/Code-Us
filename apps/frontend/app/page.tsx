import { treaty } from "@elysiajs/eden"
import type { App } from "@repo/elysia-be/app"

const app = treaty<App>(`${process.env.BACKEND_PORT && 'localhost:8000'}`)

export default function Page(){
  
  return <div>
    alright
  </div>
}