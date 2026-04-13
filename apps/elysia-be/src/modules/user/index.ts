import Elysia from "elysia";
import { AuthModel } from "./model";
import { Auth } from "./service";
import jwt from "@elysiajs/jwt"
import { writeLog } from "../../constants/log";

export const user = new Elysia({prefix : "/user"})
    .post("/signup", async function ({ body, status }) {
        const { email,image, password, name } = body
        const res = await Auth.signup({email, image, password, name})
        console.log(res)
        if(!res){
            return status(400,{
                msg : "eamil is already taken"
            })
        }
        return status(200, {
            userId : res.userId
        })

    }, {
        body : AuthModel.signUpSchema,
        response : {
            200 : AuthModel.signUpReponseSuccess,
            400 : AuthModel.signupReponseFailed
        }
    })
    .use(
        jwt({
            name : "jwt",
            secret : process.env.JWT_SECRET!
        })
    )
    .post("/signin", async function ({body, jwt, cookie : {auth}}){
        const { email, password } = body
        const id = await Auth.signin({email, password})
        if(!id){
            return {
                msg : "user not found"
            }
        }
        const token = await jwt.sign({sub : id.toString()})
        // writeLog(JSON.stringify(token))
        auth.set({
            value : token,
            maxAge : 7 * 84600, // 7 dayes
            httpOnly : true
        })
        return {
            token 
        }
    },{
        body : AuthModel.signinSchema
    })