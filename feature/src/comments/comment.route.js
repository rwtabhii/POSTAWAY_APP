import express from "express";
import { commentController } from "./comment.controller.js";


const commentRouter = express.Router();
const commentcontroller = new commentController();



commentRouter.get("/:postid", commentcontroller.getComment); 
commentRouter.post("/", commentcontroller.addComment);          
commentRouter.put("/:postid", commentcontroller.updateComment);      
commentRouter.delete("/:postid", commentcontroller.deleteComment);


export default commentRouter;


