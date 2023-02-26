import { User } from "../core/User.js";
import { checkAuthJWT } from "../utils/index.js";
import { factoryOfRoutes } from "./factoryOfRoutes.js";

const signUp = async ({body}) => {
  return {data:await User.sigUp(body)}
}
const signIn = async ({body}) => {
  return {data:await User.sigIn(body)}
}
const signInGoogle = async ({body}) => {
  return {data:await User.sigInGoogle(body)}
}
const recover = async ({body}) => {
  return {message:await User.recover(body)}
}
const newCredentials = async ({body}) => {
  return {message:await User.newCredentials(body)}
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
    endPoint: "/v1/account/google/sign-in",
    callback: signInGoogle,
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
  {
    endPoint: "/v1/account/recover/new-credentials",
    callback: newCredentials,
    method: "post",
    middlewares: [],
    responseType: "json",
  },
];

const vertion = "v1";
const prefix = "account";
export const account = factoryOfRoutes(calls, vertion, prefix);