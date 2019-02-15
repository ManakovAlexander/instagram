const express = require('express');

const auth = require('../middlewares/auth');
const User = require('../models/user');
const upload = require('../libs/upload');

const router = express.Router();

router.get('', auth, async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.authToken.userId }, ['name', 'avatarId']).exec();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/:id', auth, async (req, res, next) => {
  try {
    if (req.params.id !== req.authToken.userId) {
      throw new Error('Cannot edit another user.');
    }
    await User.updateOne({ _id: req.authToken.userId }, { $set: req.body }).exec();
  } catch (err) {
    next(err);
  }
});

router.post('/avatar', auth, upload.single('avatar'), async (req, res, next) => {
  try {
    const { filename } = req.file;
    await User.updateOne({ _id: req.authToken.userId }, { avatarId: filename });
    res.json(filename);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
