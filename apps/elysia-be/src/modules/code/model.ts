import { t } from "elysia";

export namespace CodeModel{
    export const userCode = t.Object({
        code : t.String()
    })
    export type UserCode = typeof userCode.static

    export const codeResponse = t.Object({
        languages : t.Array(t.Object({}))
    })
    export type CodeReponse = typeof codeResponse.static
}