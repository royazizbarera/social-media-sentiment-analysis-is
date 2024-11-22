// user.js
class User {
  constructor(userId, username, provider) {
    this.userId = userId;
    this.username = username;
    this.provider = provider;
  }
}

module.exports = User;