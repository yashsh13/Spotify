import { createClient } from "redis";
import parsedEnv from "../config/env.js";

export const redisClient = createClient({ url: parsedEnv.REDIS_URL});

redisClient.on('connect', ()=>console.log("Redis is connected"));
redisClient.on('ready', ()=>console.log("Redis is ready"));
redisClient.on('error', (error)=>console.log("Error occured while connecting to Redis:",error));
redisClient.on('end',()=>console.log("Redis Disconnected"));
redisClient.on('reconnecting', ()=>console.log("Redis is reconnecting"));

const connectCache = async () => {
    await redisClient.connect();
}

process.on('SIGINT',async ()=>{
    await redisClient.quit();
});

process.on('SIGTERM',async ()=>{
    await redisClient.quit();
});

export default connectCache;


