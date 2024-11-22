// post.js
class Post {
  constructor(postId, postTitle, linkPost, linkPreviewPost = null, likes = 0, views = 0, totalComments = 0) {
    this.postId = postId;
    this.postTitle = postTitle;
    this.linkPost = linkPost;
    this.linkPreviewPost = linkPreviewPost;
    this.likes = likes;
    this.views = views;
    this.totalComments = totalComments;
    this.comments = []; // Relasi ke comments
  }

  // Tambah komentar ke Post
  addComment(comment) {
    this.comments.push(comment);
  }

  // Dapatkan semua komentar
  getComments() {
    return this.comments;
  }
}

module.exports = Post;

// e.gj
const x = {
  "postId": "7412853218570423560",
  "postTitle": "📦✨ Unboxing Time! ✨📦 Unboxing Advan Tab A10! Desainnya minimalis tapi tetap stylish. Layarnya lebar banget, cocok buat nonton film atau main game. Baterainya juga awet, jadi bisa dipakai seharian. Yuk, simak video unboxingnya. #advan #advanindonesia #madetoinspire #AdvanTabA10 #ConnectEveryMoment #unboxing #Multitasking #bateraiawet #fyp #foryourpage",
  "linkPost": "https://tiktok.com/video/7412853218570423560",
  "likes": 100000,
  "views": 1000000,
  "totalComments": 1,
  "comments": [
    {
      "commentId": "7413226728846213893",
      "commentText": "no stylus pen?🥺",
      "commentDate": "11/9/2024, 10.46.06",
      "user": {
        "userId": "6793597939333137410",
        "username": "Singa G",
        "provider": "Tiktok"
      }
    }
  ],
}