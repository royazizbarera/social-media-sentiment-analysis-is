// review.js
class Review {
  constructor(
    reviewId,
    reviewText,
    user,
    problemCategory = undefined, // e.g. "Harga", "Baterai"
    sentimentValue = undefined // 1,0,-1
  ) {
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
