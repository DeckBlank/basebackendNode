import http from 'http';
import { app } from './app'
import { PORT , PROYECTO, APP_ENV, PAIS } from './config/enviroments';
import { logger } from './config/logger';
import {  db, dbMysql } from './db';

export const server = http.createServer(app);

const initServer = async (server)=>{
    await db;
    await dbMysql;
    await server.listen(PORT);
    logger.info(`\nApp: ${PROYECTO}\nCountry: ${PAIS}\nEnviroment: ${APP_ENV}\nPort: ${PORT}\nDate: ${new Date()}`)
    
}
initServer(server);