import { APP_ENV, SECRET } from "../config/enviroments.js";

import jwt from 'jsonwebtoken';
import passport from "passport";

const responseErrorJWT = (message)  => {
    switch (message) {
        case 'invalid token':
            return 'invalid-token';
        case 'jwt expired':
            return 'token-expired';
        case 'token-omited':
            return 'token-omited';
    }
}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?authHeader.split('Bearer ')[1]:undefined;
    if (token == undefined) throw new Error("token-omited");
    try {
        req.tokenContent = jwt.verify(token, SECRET);
    } catch (error) {
        error.type = responseErrorJWT(error.message);
        return next(error);
    }
    next()
}

export {
    passport,
    authMiddleware,
    responseErrorJWT
}