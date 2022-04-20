import cors from 'cors';
import { PERMITIDOS } from './enviroments';

export const whitelist = PERMITIDOS.split(' ')
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
