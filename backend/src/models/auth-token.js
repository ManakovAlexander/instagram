const mongoose = require('mongoose');

const AuthTokenSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const AuthToken = mongoose.model('AuthToken', AuthTokenSchema);

module.exports = AuthToken;
