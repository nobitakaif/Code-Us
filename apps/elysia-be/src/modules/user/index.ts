import Elysia, { status } from "elysia";
import { AuthModel } from "./model";
import { Auth } from "./service";

export const user = new Elysia({prefix : "/user"})
    .post("/signup", async function ({ body, status }) {
        const { email,image, password, name } = body
        const res = await Auth.signup({email, image, password, name})
        if(!res){
            return status(400,{
                msg : "signup failed pls try again"
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