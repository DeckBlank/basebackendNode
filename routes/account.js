import { Router } from "express";
import { logger } from "../config/logger";
import { createJWT } from "../utils";
import { passport } from "../auth";
const localStrategy = require("passport-local").Strategy;
import { responseGenerator } from "../utils/responseGenerator";
import { factoryOfRoutes } from "./factoryOfRoutes";
import { User } from "../core/User";


//export const account = Router();



const createTokenLogin = async ({ username, password }) => {
  console.log({ username, password });
  return responseGenerator({
    data: {
      token: await createJWT({
      hola : 'mundo'  
      })
    },
  });
};

const loginCOntroller = new localStrategy(
  {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const response = await createTokenLogin(req.body);
      return done(null, response);
    } catch (error) {
      logger.error(error);
      return done(
        null,
        false,
        responseGenerator({ status: "error", message: "User not found" })
      );
    }
  }
);
passport.use("login", loginCOntroller);

/* account.post(`/${vertion}/${prefix}`, [], async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    if (err || !user) return res.status(401).json(info);
    return res.json(user);
  })(req, res, next);
});


account.post(`/${vertion}/${prefix}/login`, [], (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    if (err || !user) return res.status(401).json(info);
    try {
      const token = await createJWT(user);
      return res.json({ token });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});


account.post(`/${vertion}/${prefix}/signup`,
  (req, res, next) => {
    passport.authenticate('signup', async (err, user, info) => {
        if(err||!user) return res.status(409).json(info);
        try {
          let { _id , email, roles} = user;
          const token = await jwt.sign({ _id , roles }, SECRET,
            {
                expiresIn: "2h",
            });
          res.json({ token });
          let tokenConfirmation = await jwt.sign({ _id  }, SECRET,
            {
                expiresIn: "12h",
            });
          let hrefConfirmationEmail = `${URL_VALIDATE_EMAIL}?token=${tokenConfirmation}`
          console.log(hrefConfirmationEmail);
          let msg = {
            email : email,
            subject : `Creación de cuenta en BLABLABLA`,
            text : `Hola, agradecemos tu registro en BLABLABLA.`,
            html : `<b>=)</b> Hola, agradecemos tu registro en BLABLABLA, confirma tu email en este <a href="${hrefConfirmationEmail}">Link</a>.`
          }
          let resp  = await sendMail(msg)
        } catch (error) {
          console.log(error);
          return next(error);
        }
      }
    )(req, res, next);
  }
); */

const validateTokenConfirmEmail = async ({body,params,query,req,res})=>{
  let {token} = query;
  let tokenResp = await jwt.verify(token, SECRET);
  console.log(tokenResp);
  return 'alv';
}

/* account.get(`/${vertion}/${prefix}/confirm-email`, [], async (req,res,next) => {
  const {body,params,query} = req;
  let validateTokenConfirmEmailResp = await validateTokenConfirmEmail({body,params,query,req,res})
  return res.json(responseJson({data:validateTokenConfirmEmailResp}));
}); */

const signUp = async ({body}) => {
  const { password, email} = body;
  return await User.sigUp({ password, email});
}
const signIn = async ({body}) => {
  const { password, email} = body;
  return {data:await User.sigIn({ password, email})}
}


const calls = [
  {
    endPoint: "/v1/account/sign-up",
    callback: signUp,
    method: "post",
    middlewares: [],
    responseType: "json",
  },
  {
    endPoint: "/v1/account/sign-in",
    callback: signIn,
    method: "post",
    middlewares: [],
    responseType: "json",
  },
];

const vertion = "v1";
const prefix = "account";
export const account = factoryOfRoutes(calls, vertion, prefix);