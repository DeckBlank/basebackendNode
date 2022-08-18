import { account } from "./account"
import { validateToken } from "./validateToken"
import { routesNotFound } from "./routesNotFound"
import { mainHandleErrors } from "./mainHandleErros"
import { testRouteError } from "./testRoutes"
import { login } from "./login"

export const routesNotProtectecByAuth = [
    account,
    login
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