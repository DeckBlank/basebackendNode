import http from 'http';
import { app } from './app'
import { PORT } from './config/enviroments';
import {  db } from './db';

export const server = http.createServer(app);

const initServer = async (server)=>{
    await db;
    await server.listen(PORT);
    console.log(`App in port ${PORT}`);
    
}
initServer(server);