import { AuthModel } from "./model";
import {  prisma } from "@repo/db"

export abstract class Auth{
    static async signup({email, password, name, image} : AuthModel.SignUpSchema) : Promise<AuthModel.SignUpResponseSuccess | null>{
        try{
            const response = await prisma.user.create({
                data : {
                    name, 
                    email,
                    password : await Bun.password.hash(password, {algorithm : "bcrypt", cost : 10}),
                    image
                }
            })
            return {
                userId : response.id
            }
        }catch(e){
            return null
        }
    }
}