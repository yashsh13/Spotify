import prismaClient from "./prismaClient.js";

export default async function connectDB(){
    try{
        await prismaClient.$connect();
        console.log("DataBase connected successfully");
    } catch (error) {
        console.log("Error while connecting to DataBase:", error);
        process.exit(1);
    }
};

process.on("SIGINT",async ()=>{
    await prismaClient.$disconnect();
    console.log("DataBase disconnected");
});

process.on("SIGTERM",async ()=>{
    await prismaClient.$disconnect();
    console.log("DataBase disconnected");
});