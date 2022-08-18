import { factoryOfRoutes } from "./factoryOfRoutes.js";

const getLogin = async ({ body, params, query, tokenContent }) => {
  let { page, limit, search } = query;
  return {
    message: "Login here!!!",
    data: [
      {
        email: "email@domain.com",
      },
    ],
  };
};

const calls = [
  {
    endPoint: "/v1/login",
    callback: getLogin,
    method: "post",
    middlewares: [],
    responseType: "json",
  },
];

const vertion = "v1";
const prefix = "login";
export const login = factoryOfRoutes(calls, vertion, prefix);
