import passport from "passport";
import { localLogin, localSignUp,jwt } from "./localAuth";

passport.use('signup', localSignUp);
passport.use('login', localLogin);
passport.use('jwt',jwt);

const authMiddleware = passport.authenticate('jwt', { session: false });

export {
    passport,
    authMiddleware
}