import { account } from "./account.js"
import { mainHandleErrors } from "./mainHandleErros.js"
import { routesNotFound } from "./routesNotFound.js"
import { secureEndPoint } from "./secureEndPoint.js"
import { testRouteError } from "./testRoutes.js"

export const routesNotProtectecByAuth = [
    account,
]
export const routesProtectecByAuth = [
    secureEndPoint,
]

export const  basicHandlers = [
    routesNotFound,
    mainHandleErrors
]

export const  testRouters = [
    testRouteError
]