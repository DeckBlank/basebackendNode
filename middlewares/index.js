import { authMiddleware } from "../auth";

export const signedRoute = [authMiddleware]