import { t } from "elysia";

export namespace AuthModel  {

    export const signUpSchema = t.Object({
        email : t.String({format : "email"}),
        name : t.String({minLength : 4, maxLength : 20}),
        password : t.String({maxLength : 40, minLength : 8,}),
        image : t.Optional(t.String())
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

    export const signinSchema = t.Object({
        email : t.String({format : 'email'}),
        password : t.String({minLength : 8, maxLength : 40})
    })
    export type SigninSchema = typeof signinSchema.static

    export const signinReponseSuccess = t.Object({
        token : t.String()
    })
    export type SigninReponseSuccess = typeof signUpReponseSuccess.static

    export const signinResponseFailed = t.Object({
        msg : t.String()
    })
    export type SigninResponseFailed = typeof signinResponseFailed.static
}