import { PERMITIDOS } from './enviroments.js';
import cors from 'cors';
import { logger } from './logger.js';

if(!PERMITIDOS) logger.error('You need add PERMITIDOS on enviroment!')
export const whitelist = PERMITIDOS?PERMITIDOS.split(' '):[];
const corsOptions = {
  origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1||origin === undefined) {
          callback(null, true)
        } else {
         callback(new Error('No permitido por CORS'))
        }
  },
  optionsSuccessStatus: 200 
}

export const corsMiddleware = cors(corsOptions);
