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
const x = [
  {
    "postId": "7413224424876346630",
    "postTitle": "Bosan dengan laptop yang itu-itu aja? Advan 360 Stylus Pro hadir dengan Processor Intel Core i3-1215U, desain elegan dan fitur-fitur canggih yang akan membantumu mengolah ide menjadi seni dan kreatifitas tanpa batas 🎨✨ #advan #advanindonesia #madetoinspire #EksklusifLaunching #360StylusPro #laptop2in1 #DrawYourVision #fyp #foryourpage",
    "linkPost": "https://www.tiktok.com/@ferrzgntg/video/7413224424876346630",
    "views": "0",
    "likes": 3,
    "totalComments": 7,
    "comments": [
      {
        "commentId": "7429630736779477778",
        "commentText": "min bikin hp dengan chipset Qualcomm Snapdragon 8 gen 1 dengan penyimpanan 6/128 8/256 12/1tb,dan batre 6500 mah fast charging 90 wat",
        "commentDate": "25/10/2024, 15.41.55",
        "user": {
          "userId": "7407082908068774919",
          "username": "ferz🦖",
          "provider": "Tiktok"
        }
      },
      {
        "commentId": "7434096072661140279",
        "commentText": "min buat hp advan gaming kelas mid dengan chipset dimensity 8300 ultimate dan game room yang banyak fitur, layar AMOLED bezel tipis, ada lampu RGB nya 😋",
        "commentDate": "6/11/2024, 16.29.55",
        "user": {
          "userId": "7257526579449005061",
          "username": "Ryouuuu",
          "provider": "Tiktok"
        }
      }
    ]
  },
]