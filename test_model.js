
const Post = require('./models/post');
const Comment = require('./models/comment');
const User = require('./models/user');
const Review = require('./models/review');
const Product = require('./models/product');

// Buat user
const user1 = new User(1, 'john_doe', 'Tiktok');
const user2 = new User(2, 'jane_doe', 'Tiktok');

// Buat post
const post = new Post(201, 'Interesting Post Title', 'http://example.com/post/201');

// Tambahkan komentar ke post
const comment1 = new Comment(101, 'This is a sample comment.', '2024-11-22T10:30:00Z', 'positive', user1);
const comment2 = new Comment(102, 'I found this post very helpful!', '2024-11-22T11:00:00Z', 'neutral', user2);

post.addComment(comment1);
post.addComment(comment2);

// Lihat komentar pada post
console.log('Post Comments:');
console.log(JSON.stringify(post));

// Buat beberapa user
const user3 = new User(3, 'john_doe', 'Tokopedia');
const user4 = new User(4, 'jane_doe', 'Tokopedia');

// Buat sebuah produk
const product = new Product(401, 'Sample Product', 'http://example.com/product/401');

// Tambahkan ulasan ke produk
const review1 = new Review(301, 'Great product!', 'positive', 'none', user3);
const review2 = new Review(302, 'Could be improved.', 'negative', 'design', user4);

product.addReview(review1);
product.addReview(review2);

// Lihat semua ulasan untuk produk
console.log('Product Reviews:');
console.log(JSON.stringify(product));