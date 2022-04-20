import { Router } from "express";
import { API_VERTION } from "../config/enviroments";

export const testRouteError = Router();

const vertion = API_VERTION ? API_VERTION : "v1";
const prefix = "test-routes";
testRouteError.post(
  `/${vertion}/${prefix}/error`,
  [],
  async (req, res, next) => {
    try {
      throw new Error("Hello error!");
    } catch (error) {
      error.type = "no-data";
      next(error);
    }
  }
);
