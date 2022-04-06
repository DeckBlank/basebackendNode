import { Router } from "express";
import { authMiddleware } from "../auth";
import { logger } from "../config/logger";
import { responseJson } from "../helpers";


export const login = Router();
const vertion = 'v1';
const prefix = 'login';

const globalMiddleware = [(req,res,next)=>{
    if(req.path==='/v1/logi1n') return res.json({alv:'alv'}).status(402)
    console.log(req.path);
    next();
}]
export const loginGet = async ({body,params,query}) => {
  try {
    return 'algo';
  } catch (error) {
    logger.info(error);
    return null;
  }
}

login.get(`/${vertion}/${prefix}`,[...globalMiddleware],async (req,res)=>{
    const {body,params,query} = req;
    let loginGetResp = await loginGet({body,params,query})
    return res.json(responseJson({data:loginGetResp}));
})

