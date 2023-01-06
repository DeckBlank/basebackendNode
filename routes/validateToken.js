import { Router } from "express";
import { responseGenerator } from "../utils/responseGenerator.js";

export const validateToken = Router();
const vertion = 'v1';
const prefix = 'validate-token';


validateToken.post(`/${vertion}/${prefix}`, [], async (req, res, next) => {
  res.json(responseGenerator({status:'success',message:'ok'}))
});

