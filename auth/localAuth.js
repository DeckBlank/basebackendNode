const JWTstrategy = require("passport-jwt").Strategy;
const localStrategy = require("passport-local").Strategy;

import { ExtractJwt } from "passport-jwt";
import { SECRET } from "../config/enviroments.js";
import { isValidPassword } from "../utils";
import { logger } from "../config/logger";
import { mgmtUser } from "../db/mongodb/models";

export const localSignUp = new localStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  async (req,email, password, done) => {
    try {
      let {body } = req;
      let {roles} = req.body;
      const user = await mgmtUser.createOne({data:{ email, password , roles }});
      return done(null, user);
    } catch (error) {
      logger.error(error);
      return done(null, false, { message: "User was not create!" });
    }
  }
);

export const localLogin = new localStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (req, email, password, done) => {
    try {
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
