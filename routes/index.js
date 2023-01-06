import { account } from "./account.js"
import { mainHandleErrors } from "./mainHandleErros.js"
import { routesNotFound } from "./routesNotFound.js"
import { testRouteError } from "./testRoutes.js"
import { validateToken } from "./validateToken.js"

export const routesNotProtectecByAuth = [
    account
]
export const routesProtectecByAuth = [
    validateToken,
]

export const  basicHandlers = [
    routesNotFound,
    mainHandleErrors
]

export const  testRouters = [
    testRouteError
]