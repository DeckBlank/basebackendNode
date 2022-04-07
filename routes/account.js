import { Router } from "express";
import { logger } from "../config/logger";
import {  mgmtRolls } from "../db/mongodb/models";
import { responseJson } from "../helpers";
import {  createJWT } from "../utils";
import { passport } from "../auth";
import { SECRET ,URL_VALIDATE_EMAIL} from "../config/enviroments";
import { sendMail } from "../utils/services/sendGrid";
const jwt = require('jsonwebtoken');

export const account = Router();
const vertion = "v1";
const prefix = "account";

const globalMiddleware = [
  (req, res, next) => {
    next();
  },
];
export const signIn = async ({ body, params, query, req, res, next }) => {
  let token = await passport.authenticate("login", async (err, user, info) => {
    if (err || !user) return res.status(401).json(info);
    try {
      const token = await createJWT(user);
      return { token };
    } catch (error) {
      return null;
    }
  });
};

account.post(`/${vertion}/${prefix}`, [], (req, res, next) => {
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
);

const validateTokenConfirmEmail = async ({body,params,query,req,res})=>{
  let {token} = query;
  let tokenResp = await jwt.verify(token, SECRET);
  console.log(tokenResp);
  return 'alv';
}

account.get(`/${vertion}/${prefix}/confirm-email`, [], async (req,res,next) => {
  const {body,params,query} = req;
  let validateTokenConfirmEmailResp = await validateTokenConfirmEmail({body,params,query,req,res})
  return res.json(responseJson({data:validateTokenConfirmEmailResp}));
});


/* try {
  let admin = mgmtRolls.createMany({
    data:[{
      name :'admin',
      allowRoutes : [{
        path : '/create/',
        method : 'post'
      }]
    }]
  })
  console.log(admin);
} catch (error) {
  console.log(error);
} */