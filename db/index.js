import { logger } from "./../config/logger.js";
import {
  DB_BDG,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOST,
  MYSQL_DATABASE,
} from "../config/enviroments";
import mongoose from "mongoose";
import Sequelize from 'sequelize'

export const db = ((base = { credentials: DB_BDG, ref: "DB_BDG" }) => {
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
})();
export const dbMysql = ((
  base = {
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    ref: MYSQL_DATABASE,
  }
) => {
  let { user, password, host, database, ref } = base;
  try {
    let connection = new Sequelize(database, user, password, {
      host: host,
      dialect: "mysql",
    });
    logger.info(`${ref} conected`);
    return connection;
  } catch (error) {
    logger.error(`An error: ${error}`);
    return null;
  }
})();
