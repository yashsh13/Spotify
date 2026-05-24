import app from "./app";
import parsedEnv from "./config/env";

app.listen(parsedEnv.PORT,()=>{
    console.log("Server Running on port:",parsedEnv.PORT);
});