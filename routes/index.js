import { account } from "./account"
import { validateToken } from "./validateToken"
import { routesNotFound } from "./routesNotFound"
import { mainHandleErrors } from "./mainHandleErros"
import { testRouteError } from "./testRoutes"

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