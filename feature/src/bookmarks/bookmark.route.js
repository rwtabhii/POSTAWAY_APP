import express from "express";
import { bookmarkController } from "./bookmark.controller.js";


const bookmarkRoute = express.Router()
const bookmarkcontroller = new bookmarkController();


bookmarkRoute.post("/:postid", bookmarkcontroller.toggleBookmark);

bookmarkRoute.get("/", bookmarkcontroller.getUserBookmarks);

export default bookmarkRoute;