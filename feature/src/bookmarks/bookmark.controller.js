import { bookmarkModel } from "./bookmark.model.js";
import { postModel } from "../posts/posts.model.js"; // to get post details

export class bookmarkController {
  toggleBookmark(req, res, next) {
    try {
      const userid = req.userid;
      const { postid } = req.params;

      const result = bookmarkModel.toggleBookmark(userid, postid);

      if (result.removed) {
        return res.status(200).send("Bookmark removed");
      } else {
        return res.status(201).send("Post bookmarked");
      }
    } catch (err) {
      next(err);
    }
  }

  getUserBookmarks(req, res, next) {
    try {
      const userid = req.userid;
      const userBookmarks = bookmarkModel.getUserBookmarks(userid);
      
      const bookmarkedPosts = userBookmarks.map(bookmark => {
        const post = postModel.getOnePost(bookmark.postid);
        return post;
      });

      res.status(200).send(bookmarkedPosts);
    } catch (err) {
      next(err);
    }
  }
}
