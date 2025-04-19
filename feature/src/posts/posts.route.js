import express from "express"
import { postController } from "./posts.controller.js";

const postcontroller = new postController()

const postRouter = express.Router()


postRouter.get("/",postcontroller.getAllPosts);
postRouter.get("/filter", postcontroller.getUserPostsFiltered);
postRouter.get("/user",postcontroller.getUserPosts);
postRouter.get("/draft", postcontroller.getDraftPosts);
postRouter.get("/archived", postcontroller.getArchivedPosts);
postRouter.get("/sorted/date", postcontroller.getSortedPostsByDate);
postRouter.get("/:id",postcontroller.getOnePost);
postRouter.post("/",postcontroller.addPost);
postRouter.put("/:id",postcontroller.updatePost);
postRouter.delete("/:id",postcontroller.deletePost);









export default postRouter;