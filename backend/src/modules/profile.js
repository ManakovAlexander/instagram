const express = require('express');

const auth = require('../middlewares/auth');
const User = require('../models/user');
const upload = require('../libs/upload');

const router = express.Router();

router.get('', auth, async (req, res, next) => {
  try {
    if (!req.authToken) {
      throw new Error('error!');
    }
    const user = await User.findOne({ _id: req.authToken.userId }, ['name', 'avatarId']).exec();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/avatar', auth, upload.single('avatar'), async (req, res, next) => {
  try {
    const { filename } = req.file;
    await User.updateOne({ _id: req.authToken.userId }, { avatarId: filename })
    res.json(filename);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
