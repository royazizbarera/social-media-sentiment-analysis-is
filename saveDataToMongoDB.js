const mongoose = require("mongoose");
const fs = require("fs");

// Koneksi ke MongoDB
mongoose.connect("mongodb://localhost:27017/socialMedia")
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Connection error:", err));


// Schema untuk Comment
const commentSchema = new mongoose.Schema({
  commentId: String,
  commentText: String,
  commentDate: String,
  sentimentValue: { type: Number, default: null },
  socialMediaUser: {
    userId: String,
    username: String,
    provider: String,
  }
});

const postSchema = new mongoose.Schema({
  postId: String,
  postTitle: String,
  linkPost: String,
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  totalComments: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema], // Daftar komentar sebagai array subdokumen
});

const Post = mongoose.model("Post", postSchema);

// Schema untuk Review
const reviewSchema = new mongoose.Schema({
  reviewId: String,
  reviewText: String,
  sentimentValue: Number,
  problemCategory: String,
  socialMediaUser: {
    userId: String,
    username: String,
    provider: String,
  },
  product: {
    productId: Number,
    productName: String,
    linkProduct: String,
  },
});

const Review = mongoose.model("Review", reviewSchema);

// Fungsi untuk menyimpan data ke MongoDB
async function saveData() {
  try {
    // Membaca file JSON
    const rawData = fs.readFileSync("results/posts_with_comments.json");
    const data = JSON.parse(rawData);

    // Konversi data JSON menjadi model Post
    const posts = data.map((post) => ({
      postId: post.postId,
      postTitle: post.postTitle,
      linkPost: post.linkPost,
      views: post.views,
      likes: post.likes,
      totalComments: post.totalComments,
      comments: post.comments.map((comment) => ({
        commentId: comment.commentId,
        commentText: comment.commentText,
        commentDate: comment.commentDate,
        socialMediaUser: {
          userId: comment.socialMediaUser.userId,
          username: comment.socialMediaUser.username,
          provider: comment.socialMediaUser.provider,
        },
      })),
    }));

    // Simpan semua post ke MongoDB
    await Post.insertMany(posts);

    console.log("Data posts successfully saved to MongoDB!");
  } catch (error) {
    console.error("Error saving data:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Jalankan fungsi saveData
saveData();