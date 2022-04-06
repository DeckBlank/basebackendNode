const JWTstrategy = require("passport-jwt").Strategy;
const localStrategy = require("passport-local").Strategy;
import { ExtractJwt } from "passport-jwt";
import { SECRET } from "../config/enviroments";
import { mgmtUser } from "../db/mongodb/models";
import { isValidPassword } from "../utils";

export const localSignUp = new localStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  async (req,email, password, done) => {
    try {
      let {body } = req;
      console.log(body);
      let {roles} = req.body;
      const user = await mgmtUser.createOne({data:{ email, password , roles }});
      console.log('user',user);
      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(null, false, { message: "User was not create!" });
    }
  }
);

export const localLogin = new localStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      console.log(email,
        password);
      const user = await mgmtUser.findOne({ email });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const validate = await isValidPassword(user, password);

      if (!validate) {
        return done(null, false, { message: "Wrong Password" });
      }

      return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
      return done(error);
    }
  }
);

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearrer"),
  secretOrKey: SECRET,
};
export const jwt = new JWTstrategy(opts, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
});
