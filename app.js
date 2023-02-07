import { basicHandlers, routesNotProtectecByAuth, routesProtectecByAuth } from "./routes/index.js";

import { authMiddleware } from "./auth/index.js";
import bodyParser from  'body-parser';
import { corsMiddleware } from "./config/cors.js";
import express from "express";
import helmet from 'helmet';
import morgan from 'morgan';
import { responseGenerator } from "./utils/responseGenerator.js";

//uncoment to use it import  fileUpload  from "express-fileupload";




//import { rootValue, schema } from "./graphQL/index";
//import { APP_ENV } from "./config/enviroments.js";
//import { graphqlHTTP } from "express-graphql";


export const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet({ contentSecurityPolicy: (process.env.APP_ENV === 'development') ? false : undefined }));
//uncoment to use it app.use(fileUpload());
/* app.post('/',  (req,res) =>{
    res.json(responseGenerator({data:['Hola mundo']}))
}) */


app.use([
    corsMiddleware,
    ...routesNotProtectecByAuth,
    authMiddleware,
    ...routesProtectecByAuth
]);

app.use([
    ...basicHandlers
]);
/* app.use('/graphql',graphqlHTTP({
    schema,
    rootValue,
    graphiql: APP_ENV==='development'?true:false
})); */


