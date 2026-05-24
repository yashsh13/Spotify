import express, { Express } from "express";
import parsedEnv from "./config/env";

const app: Express = express();

app.get('/health',(req,res)=>{
    return res.json({
        message: `Server healthy on PORT: ${parsedEnv.PORT}`
    })
})

export default app;
