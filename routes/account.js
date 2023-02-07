import { User } from "../core/User.js";
import { factoryOfRoutes } from "./factoryOfRoutes.js";

const signUp = async ({body}) => {
  return {data:await User.sigUp(body)}
}
const signIn = async ({body}) => {
  return {data:await User.sigIn(body)}
}
const recover = async ({body}) => {
  const {email} = body;
  return {message:await User.recover({email})}
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
  {
    endPoint: "/v1/account/recover",
    callback: recover,
    method: "post",
    middlewares: [],
    responseType: "json",
  },
  /* {
    endPoint: "/v1/account",
    callback: ({res})=>{res.status(200); return {data:'hello'}},
    method: "get",
    middlewares: [],
    responseType: "json",
  }, */
];

const vertion = "v1";
const prefix = "account";
export const account = factoryOfRoutes(calls, vertion, prefix);