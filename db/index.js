import {
  DB_BDG,
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_USER,
} from "../config/enviroments.js";

import Sequelize from 'sequelize'
import { logger } from "./../config/logger.js";
import mongoose from "mongoose";

const mongoMongooseInitiator = (base) => {
  let { credentials, ref } = base;
  try {
    let connection = mongoose.createConnection(credentials, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(`${ref} conected`);
    return connection;
  } catch (error) {
    logger.error(`An error: ${error}`);
    return null;
  }
}


const mysqSequalizeInitiator = (base) => {
  let { user, password, host, database, ref } = base;
  try {
    let connection = new Sequelize(database, user, password, {
      host: host,
      dialect: "mysql",
      logging: false
    });
    logger.info(`${ref} conected`);
    return connection;
  } catch (error) {
    logger.error(`An error: ${error}`);
    return null;
  }
}


export const db = mongoMongooseInitiator({ credentials: DB_BDG, ref: "DB_BDG" });