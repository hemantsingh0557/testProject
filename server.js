import express from "express" ;
import { dbConnection } from "./startup/dbConnection.js";
// import app from "./startup/expressStartup.js";
import config from "./config/index.js";
import { redisConnection } from "./startup/redisConnection.js";

const app = express() ;
app.get("/" , (req , res) => {
    res.send("this si text ptoejcjksdshfshdbsm") ;
});

const startServer = async() => {
    await dbConnection() ;
    await redisConnection(); 
    // await expressStartup(app) ;
    app.listen(config.server.port , ()=> {
        console.log(`Server is running on http://localhost:${config.server.port}`);
    });
};

startServer().catch((error) => {
    console.error("Failed to start the server:", error);
});


export default app ;
