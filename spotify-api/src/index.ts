import app from "./app.js";
import parsedEnv from "./config/env.js";
import connectDB from "./database/connectDB.js";
import connectCache from "./cache/redis.js";

await connectDB();
await connectCache();

app.listen(parsedEnv.PORT,()=>{
    console.log("Server Running on port:",parsedEnv.PORT);
});