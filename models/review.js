// review.js
class Review {
  constructor(reviewId, reviewText, sentimentValue, problemCategory, user) {
    this.reviewId = reviewId;
    this.reviewText = reviewText;
    this.sentimentValue = sentimentValue;
    this.problemCategory = problemCategory;
    this.user = user; // Relasi ke user
  }

  // Dapatkan informasi user
  getUser() {
    return this.user;
  }
}

module.exports = Review;
