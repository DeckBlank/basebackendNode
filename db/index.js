import { logger } from './../config/logger.js'
import {
  DB_BDG,
} from "../config/enviroments";
import mongoose from 'mongoose'


export const db = ((base = {credentials:DB_BDG,ref:'gestionPool'}) => {
  let {credentials,ref} = base;
  try {
    let connection = mongoose.createConnection(credentials, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger .info(`${ref} conected`);
    return connection;
  } catch (error) {
    logger.error(`An error: ${error}`);
    return null;
  }
})()


