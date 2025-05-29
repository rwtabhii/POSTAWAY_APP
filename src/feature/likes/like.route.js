import express from "express";
import { likeController } from "./like.controller.js";



const likeRouter = express.Router();
const likecontroller = new likeController()


likeRouter.get("/:postid",likecontroller.getPostLikes);
likeRouter.post("/toggle/:postid",likecontroller.togglePostLike);


export default likeRouter;