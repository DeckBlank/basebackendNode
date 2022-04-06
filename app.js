import express from "express";
import { authMiddleware } from "./auth";
import { routes } from "./routes";
import { account } from "./routes/account";
import { login } from "./routes/login";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(login);
app.use(account);
app.use(authMiddleware);


