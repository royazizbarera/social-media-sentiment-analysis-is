const fs = require("fs");
const Post = require("./models/post");
const Comment = require("./models/comment");
const SocialMediaUser = require("./models/socialMediaUser");
const removeEmojis = require("./tools/removeEmojis");

// Fungsi untuk mengonversi timestamp ke format tanggal yang dapat dibaca
const formatDate = (timestamp) => {
  if (!timestamp) return "Unknown Date";
  const date = new Date(timestamp * 1000); // Konversi dari detik ke milidetik
  return date.toLocaleString("id-ID"); // Format sesuai lokal Indonesia
};

// Baca file JSON
fs.readFile("results/comments_raw.json", "utf-8", (err, data) => {
  if (err) {
    console.error("Error membaca file:", err);
    return;
  }

  // Parse JSON
  const commentsRaw = JSON.parse(data);

  // Map untuk menyimpan post berdasarkan postId
  const postMap = new Map();

  // Map untuk menyimpan user berdasarkan userId (menghindari duplikasi)
  const userMap = new Map();

  // Proses data komentar
  commentsRaw.forEach((rawComment) => {
    const userId = rawComment.user?.uid;
    const username = rawComment.user?.nickname;

    // Pastikan user valid
    if (userId && username) {
      // Buat user baru jika belum ada dalam map
      if (!userMap.has(userId)) {
        const user = new SocialMediaUser(userId, username, "Tiktok");
        userMap.set(userId, user);
      }

      // Tentukan postId
      const postId = rawComment.aweme_id;

      // Buat atau ambil post berdasarkan postId
      if (!postMap.has(postId)) {
        const post = new Post(
          postId,
          rawComment.share_info?.title || `Post Title for ID ${postId}`, // Judul post
          `https://www.tiktok.com/@${rawComment.user?.unique_id}/video/${postId}`, // Link post
          rawComment.sort_extra_score?.views || "0", // Views (jika ada)
          rawComment.digg_count || "0", // Likes
          rawComment.reply_comment_total || "0" // Total Comments
        );
        postMap.set(postId, post);
      }

      // Buat komentar
      const comment = new Comment(
        rawComment.cid, // commentId
        rawComment.text, // commentText
        formatDate(rawComment.create_time), // Konversi timestamp ke tanggal
        userMap.get(userId) // User instance
      );

      // Tambahkan komentar ke post
      postMap.get(postId).addComment(comment);
    }
  });

  // Konversi hasil ke JSON
  const postsArray = Array.from(postMap.values()).map((post) => {
    return {
      postId: post.postId,
      postTitle: post.postTitle,
      linkPost: post.linkPost,
      views: post.views,
      likes: post.likes,
      totalComments: post.totalComments,
      comments: post.getComments().map((comment) => ({
        commentId: comment.commentId,
        commentText: removeEmojis(comment.commentText.toLowerCase()),
        commentDate: comment.commentDate,
        socialMediaUser: {
          userId: comment.user.userId,
          username: comment.user.username,
          provider: comment.user.provider,
        },
      })),
    };
  });

  // Simpan ke file JSON atau tampilkan di console
  fs.writeFileSync(
    "results/posts_with_comments.json",
    JSON.stringify(postsArray, null, 2)
  );
  console.log("Data berhasil disimpan dalam posts_with_comments.json");
});
