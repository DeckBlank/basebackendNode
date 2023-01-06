import { factoryOfRoutes } from "./factoryOfRoutes.js";

const secureEndPointGet = async ({body,req,next,tokenContent}) => {
  if(req.path!=='/v1/secure-endpoint2') return new Error('not allow x2 '); // easy way to return errors
  return {data:'hello world'}
}
const customMiddleware = async (req,res,next) => {
  if(req.path!=='/v1/secure-endpoint') return next(new Error('not allow')); // way to return errors from middleweare
  next();
}


const calls = [
  {
    endPoint: "/v1/secure-endpoint",
    callback: secureEndPointGet,
    method: "get",
    middlewares: [customMiddleware],
    responseType: "json",
  },
];

const vertion = "v1";
const prefix = "secureEndPoint";
export const secureEndPoint = factoryOfRoutes(calls, vertion, prefix);