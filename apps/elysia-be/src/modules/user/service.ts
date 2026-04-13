
import { AuthModel } from "./model";
import {  prisma } from "@repo/db"
import { writeLog } from "../../constants/log";

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
            console.log("response id -> ", response.id)
            return {
                userId : response.id
            }
        }catch(e){
            writeLog(JSON.stringify(e))
            return null
        }
    }

    static async signin({email , password} : AuthModel.SigninSchema) {
        try {
            const user = await prisma.user.findFirst({
                where : {
                    email 
                }
            })
            if(!user){
                return {
                    msg : "incorret email"
                }
            }

            const checkPassword = await Bun.password.verify(password, user.password)
            if(!checkPassword){
                return {
                    msg : "incorrect password"
                }
            }
            return user.id
        }catch(e){
            writeLog(JSON.stringify(e))
            return {

            }
        }
    }
}