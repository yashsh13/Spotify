import express, { type Express } from "express";
import cookieParser from "cookie-parser";

import parsedEnv from "./config/env.js";
import errorMiddleware from "./middlewares/error.middleware.js";

import authRouter from "./modules/auth/auth.route.js";
import tracksRouter from "./modules/tracks/tracks.routes.js";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.get('/health',(_req,res)=>{
    return res.json({
        message: `Server healthy on PORT: ${parsedEnv.PORT}`
    });
});

app.use(`${parsedEnv.API_PREFIX}/auth`, authRouter);
app.use(`${parsedEnv.API_PREFIX}/tracks`, tracksRouter);

app.use(errorMiddleware);

export default app;
