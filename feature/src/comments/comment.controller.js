import { commentModel } from "./comment.model.js";

export class commentController{
 
    getComment(req, res, next) {
        try {
          const { postid } = req.params;
          const result = commentModel.getPostComment(postid);
          if (result.length === 0) {
            throw new ApplicationError("No comments found for this post", 404);
          }
          res.status(200).send( result );
        } catch (err) {
          next(err);
        }
      }
    
      addComment(req, res, next) {
        try {
          console.log(req.userid);
            const userid = req.userid
          const { postid, content } = req.body;
          if (!userid || !postid || !content) {
            throw new ApplicationError("Missing required fields", 400);
          }
          const newComment = commentModel.addPostComment(userid, postid, content );
          res.status(201).send(newComment );
        } catch (err) {
          next(err);
        }
      }
    
      deleteComment(req, res, next) {
        try {
          const userid = req.userid;
          const { postid } = req.params;
          const result = commentModel.deletePostComment(userid,postid);
          if (result === null) {
            throw new ApplicationError("Comment not found", 404);
          }
          res.status(200).send( "Comment deleted successfully" );
        } catch (err) {
          next(err);
        }
      }
    
      updateComment(req, res, next) {
        try {
          const userid = req.userid;
          const  {postid}  = req.params;
          const { content } = req.body;
          if (!content) {
            throw new ApplicationError("Content is required for update", 400);
          }
          const updatedComment = commentModel.updatePostComment(userid,postid, content);
          if (updatedComment === null) {
            throw new ApplicationError("Comment not found", 404);
          }
          res.status(200).send( updatedComment );
        } catch (err) {
          next(err);
        }
      }
}