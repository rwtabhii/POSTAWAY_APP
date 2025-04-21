import express from "express";
import jwtAuth from "./feature/src/middleware/jwttoken.js";
import userRouter from "./feature/src/user/user.route.js";
import postRouter from "./feature/src/posts/posts.route.js";
import likeRouter from "./feature/src/likes/like.route.js";
import commentRouter from "./feature/src/comments/comment.route.js";
import uploadFile from "./feature/src/middleware/fileUploadmiddleware.js";
import { applicationError } from "./feature/src/middleware/errorhandling.js";
import bookmarkRoute from "./feature/src/bookmarks/bookmark.route.js";
import loggerMiddleware from "./feature/src/middleware/logger.middleware.js";


const server = express();
server.use(express.json())
server.use(loggerMiddleware);

server.use("/api/users",userRouter);
server.use("/api/posts",jwtAuth,uploadFile.single("image"),postRouter);
server.use("/api/likes",jwtAuth,likeRouter);
server.use("/api/comments",jwtAuth,commentRouter);
server.use("/api/bookmarks",jwtAuth,bookmarkRoute);
// middleware for the non api route
server.use((req,res)=>{
  return res.status(404).send("Api route not found");
});


// error handling  middleware
server.use((err,req,res,next)=>{
    console.log(err)
    if(err instanceof applicationError){
        return res.status(err.code).send(err.message)
    }else{
        return res.status(500).send("Internal server error");
    }
})



server.listen(3000);
console.log("server is listening");