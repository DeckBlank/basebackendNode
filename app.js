import express from "express";
import { authMiddleware } from "./auth";
import helmet from 'helmet';
import morgan from 'morgan';
import { corsMiddleware } from "./config/cors";
import { basicHandlers, routesNotProtectecByAuth, routesProtectecByAuth } from "./routes";
import { graphqlHTTP } from "express-graphql";
import { rootValue , schema} from "./graphQL";
import { APP_ENV } from "./config/enviroments";
import { responseGenerator } from "./utils/responseGenerator";
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet({ contentSecurityPolicy: (process.env.APP_ENV === 'development') ? false : undefined }));

app.post('/',  (req,res) =>{
    res.json(responseGenerator({data:['Hola mundo']}))
})


app.use([
    corsMiddleware,
    ...routesNotProtectecByAuth,
    authMiddleware,
    ...routesProtectecByAuth
]);

app.use('/graphql',graphqlHTTP({
    schema,
    rootValue,
    graphiql: APP_ENV==='development'?true:false
}));

app.use([
    ...basicHandlers
]);
