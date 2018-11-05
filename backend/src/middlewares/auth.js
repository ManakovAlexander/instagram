const authorization = require('auth-header');
const AuthToken = require('../models/auth-token');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.get('authorization');
    const { scheme, token } = authorization.parse(authHeader);
    if (scheme !== 'Bearer') {
      throw new Error('Invalid auth scheme');
    }
    const authToken = await AuthToken.findOne({ token }).exec();
    if (!authToken) {
      throw new Error('Invalid auth token');
    }
    req.authToken = authToken;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
