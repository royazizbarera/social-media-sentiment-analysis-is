// product.js
class Product {
  constructor(productId, productName, linkProduct) {
    this.productId = productId;
    this.productName = productName;
    this.linkProduct = linkProduct;
    this.reviews = []; // Relasi ke reviews
  }

  // Tambah ulasan ke Product
  addReview(review) {
    this.reviews.push(review);
  }

  // Dapatkan semua ulasan
  getReviews() {
    return this.reviews;
  }
}

module.exports = Product;
