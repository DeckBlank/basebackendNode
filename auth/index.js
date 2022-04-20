import passport from "passport";
import { APP_ENV, SECRET } from "../config/enviroments";
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    if(APP_ENV==='development') return next();
    const authHeader = req.headers['authorization']
    const token = authHeader?authHeader.split('Bearer ')[1]:undefined;
    try {
        if (token == undefined) throw new Error("token-omited");
        req.user = jwt.verify(token, SECRET);
      } catch (error) {
         switch (error.message) {
             case 'invalid token':
                 error.type='invalid-token';
                 break;
             case 'jwt expired':
                 error.type='token-expired';
                 break;
             case 'token-omited':
                 error.type='token-omited';
                 break;
         }
         return next(error);
      }
    next()
}

export {
    passport,
    authMiddleware
}