import { applicationError } from "../middleware/errorhandling.js";
import { postModel, posts } from "./posts.model.js";


export class postController {

    getAllPosts(req, res) {
        const posts = postModel.getAllPosts();
        return res.status(200).send(posts);
    }
    getOnePost(req, res, next) {
        try {
            const { id } = req.params;
            const post = postModel.getOnePost(id);
            if (post) {
                return res.status(200).send(post);
            } else {
                throw new applicationError("Post not Found", 404);
            }
        } catch (err) {
            // console.log(err);
            next(err);
        }
    }
    getUserPosts(req, res, next) {
        try {
            const userid = req.userid;
            const userPosts = postModel.getUserPosts(id);
            if (userPosts) {
                return res.status(200).send(userPosts);
            } else {
                throw new applicationError("There is not post related to this User", 404)
            }
        } catch (err) {
            next(err);
        }
    }
    addPost(req, res, next) {
        const userid = req.userid;
        // console.log(userid)
        // console.log(req.body)
        const { content } = req.body;
        const image = req.file.filename;

        postModel.addPost(userid, content, image);
        return res.status(201).send("Post add successfully");
    }
    getDraftPosts(req, res, next) {
        try {
          const userid = req.userid;
          const drafts = postModel.getDraftPosts(userid);
          console.log(drafts);
          res.status(200).send(drafts);
        } catch (err) {
          next(err);
        }
      }
      
      getArchivedPosts(req, res, next) {
        try {
          const userid = req.userid;
          const archived = postModel.getArchivedPosts(userid);
          res.status(200).send(archived);
        } catch (err) {
          next(err);
        }
      }
      
    updatePost(req, res, next) {
        try {
            const { id } = req.params;
            const userid = req.userid
            const { content,status } = req.body;
            const image = req.file.filename;
            const findPost = postModel.updatePost(id, userid, content, image);
            if (findPost >= 0) {
                posts[findPost] = {
                    ...posts[findPost],
                    userid,
                    content,
                    image,
                    status
                };
                return res.status(201).send(posts[findPost])
            } else {
                throw new applicationError("Post not found", 404);
            }
        } catch (err) {
            next(err);
        }
    }
    deletePost(req, res, next) {
        try {
            const { id } = req.params;
            const findPost = postModel.deletePost(id);
            if (findPost >= 0) {
                posts.splice(findPost, 1);
                return res.status(200).send("Deletion successfully");
            } else {
                throw new applicationError("Posts not found", 404);
            }
        } catch (err) {
            next(err);
        }
    }
    getSortedPostsByDate(req, res, next) {
        try {
          const { order } = req.query; // "asc" or "desc"
          const sortedPosts = postModel.getAllPostsSortedByDate(order);
          res.status(200).send(sortedPosts);
        } catch (err) {
          next(err);
        }
      }
      
    getUserPostsFiltered(req, res, next) {
        try {
            const { caption } = req.query;

            const filteredPosts = postModel.getUsersPostsFiltered(caption || "");

            if (filteredPosts.length === 0) {
                throw new applicationError("No posts found for this user with given caption", 404);
            }

            return res.status(200).json(filteredPosts);
        } catch (err) {
            next(err);
        }
    }

}