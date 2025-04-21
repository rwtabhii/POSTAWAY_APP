export class likeModel {
    constructor(id, userid, postid) {
        this.id = id;
        this.userid = userid;
        this.postid = postid;
    }
    static getPostLikes(postid){   
     const allikes = likes.filter(like=> like.postid == Number(postid));
     return allikes;
    }

    static toggleLikePost(postid, userid) {
      const index = likes.findIndex(
          (like) => like.userid === Number(userid) && like.postid === Number(postid)
      );
  
      if (index >= 0) {
          likes.splice(index, 1);
          return null;
      } else{
          const postLike = new likeModel(likes.length + 1, Number(userid), Number(postid));
          return postLike;
      }
  }
  
}

export const likes = [
    {
      id: 1,
      userid: 2,
      postid: 1
    },
    {
      id: 2,
      userid: 3,
      postid: 2
    },
    {
      id: 3,
      userid: 1,
      postid: 2
    }
  ];
  