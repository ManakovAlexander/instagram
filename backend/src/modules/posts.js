const express = require('express');
const mongoose = require('mongoose');

const Post = require('../models/post');
const upload = require('../libs/upload');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('', async (req, res, next) => {
  try {
    const posts = await Post.find().populate('user');
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.post('', auth, upload.array('media'), async (req, res, next) => {
  try {
    const files = req.files;
    const post = await Post.create({
      _id: new mongoose.Types.ObjectId(),
      media: files.map(file => file.filename),
      user: req.authToken.userId,
      ...req.body
    });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// TODO: auth
router.delete('/:id', async (req, res, next) => {
  try {
    await Post.deleteMany({ _id: req.params.id });
    res.json(null);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
