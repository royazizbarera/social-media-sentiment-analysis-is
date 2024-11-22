// post.js
class Post {
  constructor(postId, postTitle, linkPost) {
    this.postId = postId;
    this.postTitle = postTitle;
    this.linkPost = linkPost;
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

  // return all
  toString() {
    let comments = '';
    this.comments.forEach((comment) => {
      comments += `Comment ID: ${comment.commentId}\n`;
      comments += `Comment: ${comment.commentText}\n`;
      comments += `Sentiment: ${comment.sentimentValue}\n`;
      comments += `User: ${comment.getUser().username}\n\n`;
    });

    return `Post ID: ${this.postId}\nTitle: ${this.postTitle}\nLink: ${this.linkPost}\n\nComments:\n${comments}`;
  }
}

module.exports = Post;
