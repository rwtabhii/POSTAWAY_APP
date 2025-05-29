import { likeModel, likes } from "./like.model.js";
import { applicationError } from "../../middleware/errorhandling.js";

export class likeController {
    getPostLikes(req, res) {
        try {
            const { postid } = req.params;
            const allLikes = likeModel.getPostLikes(postid)
            if (allLikes) {
                return res.status(200).send(allLikes);
            } else {
                throw new applicationError("No like found in that Post", 404);
            }
        } catch (err) {
            next(err);
        }
    }
    togglePostLike(req, res, next) {
        try {
            const userid = req.userid;
            const { postid } = req.params;
            const likePost = likeModel.toggleLikePost(postid, userid);

            if (likePost) {
                likes.push(likePost);
                return res.status(201).send("Post liked");
            } else {
                return res.status(200).send("Post unliked");
            }
        } catch (err) {
            next(err);
        }
    }


}