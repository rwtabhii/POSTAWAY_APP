export class commentModel{
    constructor(id,userid,postid,content){
     this.id = id;
     this.userid = userid;
     this.postid = postid;
     this.content = content;
    }
    static getPostComment(postid) {
        const filterComment =  comments.filter(comment => comment.postid === Number(postid));
        console.log(filterComment)
        return filterComment;
      }
    
      static addPostComment(userid,postid,content) {
        const newComment = new commentModel(comments.length+1,userid,postid,content);
        comments.push(newComment);
        return newComment;
      }
    
      static deletePostComment(userid,postid) {
        const index = comments.findIndex(comment=> comment.userid == Number(userid) && comment.postid == Number(postid));
        if (index === -1) return null;
        return comments.splice(index, 1);
      }
    
      static updatePostComment(userid,postid, content) {
        const index = comments.findIndex(comment=> comment.userid == Number(userid) && comment.postid == Number(postid));
        if (index === -1) return null;
        comments[index].content = content;
        return comments[index];
      }
}

export const comments = [
    {
      id: 1,
      userid: 2,
      postid: 1,
      content: "Wow, looks amazing!"
    },
    {
      id: 2,
      userid: 3,
      postid: 1,
      content: "Love this place 😍"
    },
    {
      id: 3,
      userid: 1,
      postid: 2,
      content: "Yummy! Where is this?"
    }
  ];
  