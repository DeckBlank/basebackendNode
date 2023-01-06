import { User } from "../core/User.js";
import { factoryOfRoutes } from "./factoryOfRoutes.js";

const signUp = async ({body}) => {
  return {data:await User.sigUp(body)}
}
const signIn = async ({body}) => {
  return {data:await User.sigIn(body)}
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