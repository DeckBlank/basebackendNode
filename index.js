import { APP_ENV, PAIS, PORT, PROYECTO } from "./config/enviroments.js";

import { app } from "./app.js";
import { db } from "./db/index.js";
import http from "http";
import { logger } from "./config/logger.js";

//import { sessMabUsers } from './db/mongodb/models';

export const server = http.createServer(app);

const initServer = async (server) => {
  await db;
  await server.listen(PORT);
  logger.info(`
    App: ${PROYECTO}
    Country: ${PAIS}
    Enviroment: ${APP_ENV}
    Port: ${PORT}
    Date: ${new Date()}`);
};
initServer(server);
