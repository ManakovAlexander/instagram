const express = require('express');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const User = require('../models/user');
const AuthToken = require('../models/auth-token');

const router = express.Router();

router.put('', async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login, password }).exec();
    if (!user) {
      throw new Error('Invalid login or password');
    }
    const token = uuidv4()
    await AuthToken.create({
      _id: new mongoose.Types.ObjectId(),
      userId: user._id,
      token
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
