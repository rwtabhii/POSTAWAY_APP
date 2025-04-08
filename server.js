import express from "express";
import jwtAuth from "./feature/src/middleware/jwttoken.js";
import userRouter from "./feature/src/user/user.route.js";


const server = express();

server.use("/api/users",userRouter);
server.use("/api/posts",)
server.use();
server.use();



server.listen(3000);
console.log("server is listening");