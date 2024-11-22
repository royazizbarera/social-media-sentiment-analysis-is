// comment.js
class Comment {
  constructor(
    commentId,
    commentText,
    commentDate,
    user,
    sentimentValue = undefined // 1,0,-1
  ) {
    this.commentId = commentId;
    this.commentText = commentText;
    this.commentDate = commentDate;
    this.sentimentValue = sentimentValue;
    this.user = user; // Relasi ke user
  }

  // Dapatkan informasi user
  getUser() {
    return this.user;
  }
}

module.exports = Comment;
