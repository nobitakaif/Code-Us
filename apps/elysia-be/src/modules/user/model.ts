import { t } from "elysia";


export namespace AuthModel  {

    export const signUpSchema = t.Object({
        email : t.String({format : "email"}),
        name : t.String({minLength : 4, maxLength : 20}),
        password : t.String({maxLength : 40, minLength : 8}),
        image : t.String()
    })
    export type SignUpSchema = typeof signUpSchema.static

    export const signUpReponseSuccess = t.Object({
        userId : t.String()
    })
    export type SignUpResponseSuccess = typeof signUpReponseSuccess.static

    export const signupReponseFailed = t.Object({
        msg : t.String()
    })
    export type SignupReponseFailed = typeof signupReponseFailed.static

    
}