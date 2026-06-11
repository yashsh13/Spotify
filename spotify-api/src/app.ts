import express, { type Express } from "express";

import parsedEnv from "./config/env.js";
import errorMiddleware from "./middlewares/error.middleware.js";

import authRouter from "./modules/auth/auth.route.js";

const app: Express = express();

app.use(express.json());

app.get('/health',(_req,res)=>{
    return res.json({
        message: `Server healthy on PORT: ${parsedEnv.PORT}`
    });
});

app.use(`${parsedEnv.API_PREFIX}/auth`, authRouter);

app.use(errorMiddleware);

export default app;
