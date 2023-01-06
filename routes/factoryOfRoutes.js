import { Router } from "express";
import { logger } from "../config/logger.js";
import { responseGenerator } from "../utils/responseGenerator.js";

export const factoryOfRoutes = (calls, vertion, prefix) => {
  const styleResponses = {
    table: (method, endPoint, middlewares, callback) =>
      expressHandler(method, endPoint, middlewares, callback, "json"),
    file: (method, endPoint, middlewares, callback) =>
      expressHandler(method, endPoint, middlewares, callback, "end"),
    common: (method, endPoint, middlewares, callback) =>
      expressHandler(method, endPoint, middlewares, callback, "json",responseGenerator),
    json: (method, endPoint, middlewares, callback) =>
      expressHandler(method, endPoint, middlewares, callback, "json",responseGenerator),
    undefined: (method, endPoint, middlewares, callback) =>
      expressHandler(method, endPoint, middlewares, callback, "json",responseGenerator),
    send: (method, endPoint, middlewares, callback) =>
      expressHandler(method, endPoint, middlewares, callback, "send"),
  };
  const route = Router();
  const expressHandler = (method, endPoint, middlewares, callback, response,formatter) =>
    route[method](endPoint, middlewares, async (req, res, next) => {
      const { body, query, params, tokenContent } = req;
      try {
        let responseData = await callback({ body, query, params, tokenContent, req, res });
        if(responseData instanceof Error) 
          return res.json(responseGenerator({message:responseData.message}))
        return res[response](
          formatter?formatter(responseData):(responseData)
        );
      } catch (error) {
        logger.error(error);
        return next(error);
      }
    });
  for (const call of calls) {
    let { appendix, callback, method, endPoint, middlewares, responseType } =
      call;
    styleResponses[responseType](method, endPoint, middlewares, callback);
  }
  return route;
};
