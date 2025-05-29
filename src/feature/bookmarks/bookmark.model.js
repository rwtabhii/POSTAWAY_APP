export const bookmarks = [
  {
    id: 1,
    userid: 1,
    postid: 1,
  },
  {
    id: 2,
    userid: 2,
    postid: 2,
  },
  {
    id: 3,
    userid: 1,
    postid: 7,
  }
];


export class bookmarkModel {
  constructor(id, userid, postid) {
    this.id = id;
    this.userid = userid;
    this.postid = postid;
  }

  static toggleBookmark(userid, postid) {
    const index = bookmarks.findIndex(
      b => b.userid === Number(userid) && b.postid === Number(postid)
    );

    if (index >= 0) {
      bookmarks.splice(index, 1);
      return { removed: true };
    }

    const newBookmark = new bookmarkModel(
      bookmarks.length + 1,
      Number(userid),
      Number(postid)
    );
    bookmarks.push(newBookmark);
    return { removed: false, bookmark: newBookmark };
  }

  static getUserBookmarks(userid) {
    return bookmarks.filter(b => b.userid === Number(userid));
  }
}
