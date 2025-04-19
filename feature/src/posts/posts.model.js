import { applicationError } from "../middleware/errorhandling.js";
import { comments } from "../comments/comment.model.js";
import { likes } from "../likes/like.model.js";

export class postModel {
    constructor(id, userid, content, image, status = "published") {
        this.id = id;
        this.userid = userid;
        this.content = content;
        this.image = image;
        this.status = status;
      }

      static getAllPosts() { 
        return posts.filter(post => post.status === "published")
        .map(post => {
            const postComments = comments.filter(comment => comment.postid === post.id);
            const postLikes = likes.filter(like => like.postid === post.id);
            return {
                ...post,
                likes: postLikes.length,
                comments: postComments.map(c => c.content)
            };
        });
    }
    
    static getOnePost(postid) {
      const findPost = posts.find(post => post.id === Number(postid));
      if (!findPost) return null;
      const postComments = comments.filter(comment => comment.postid === findPost.id);
      const postLikes = likes.filter(like => like.postid === postid);
      return {
          ...findPost,
          likes: postLikes,
          comments: postComments.map(c => c.content)
      };
  }
    static getUserPosts(userid) {
        const userPosts = posts.filter(post => post.userid === Number(userid));
        return userPosts;
    }
    static addPost(userid, content, image,status) {
        const post = new postModel(posts.length + 1, userid, content, image,status);
        posts.push(post);
        console.log(post)
        return post;
    }
    static getDraftPosts(userid) {
      return posts.filter(post => post.userid === Number(userid) && post.status === "draft");
    }
    
    static getArchivedPosts(userid) {
      return posts.filter(post => post.userid === Number(userid) && post.status === "archived");
    }
    
    static updatePost(id, userid, content, image) {
        const findPost = posts.findIndex(post => post.id === Number(id));
        return findPost;
    }
    static deletePost(id) {
     const findPost =  posts.findIndex(post => post.id === Number(id));
     return findPost;
    }
    static getAllPostsSortedByDate(order = "desc") {
      return [...posts].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
    
        return order === "asc" ? dateA - dateB : dateB - dateA;
      });
    }
    
    static getUsersPostsFiltered(captionFilter = "") {
        if (captionFilter.trim() !== "") {
          return userPosts.filter(post =>
            post.content.toLowerCase().includes(captionFilter.toLowerCase())
          );
        }
      
        return posts;
      }
      

}

export const posts = [
    {
      id: 1,
      userid: 1,
      caption: "Exploring the mountains!",
      image: "mountains.jpg",
      status: "published",
      createdAt: "2024-12-20T10:15:00Z"
    },
    {
      id: 2,
      userid: 2,
      caption: "Delicious food today 😋",
      image: "food.jpg",
      status: "published",
      createdAt: "2025-01-05T14:30:00Z"
    },
    {
      id: 3,
      userid: 1,
      caption: "Coding all night 💻",
      image: "laptop.jpg",
      status: "draft",
      createdAt: "2025-02-11T03:45:00Z"
    },
    {
      id: 4,
      userid: 3,
      caption: "Beach vibes 🌊",
      image: "beach.jpg",
      status: "archived",
      createdAt: "2024-11-10T08:10:00Z"
    },
    {
      id: 5,
      userid: 2,
      caption: "Sunset from my rooftop 🌇",
      image: "sunset.jpg",
      status: "draft",
      createdAt: "2025-03-01T18:20:00Z"
    },
    {
      id: 6,
      userid: 1,
      caption: "Workout session complete! 💪",
      image: "gym.jpg",
      status: "archived",
      createdAt: "2025-04-02T07:50:00Z"
    },
    {
      id: 7,
      userid: 1,
      caption: "Trying out a new recipe 🍝",
      image: "pasta.jpg",
      status: "published",
      createdAt: "2025-01-25T13:05:00Z"
    },
    {
      id: 8,
      userid: 3,
      caption: "Nature walk this morning 🌿",
      image: "forest.jpg",
      status: "archived",
      createdAt: "2025-03-15T09:00:00Z"
    }
  ];
  
  