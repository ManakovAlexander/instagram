const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/post');
const multer = require('multer');
const uuidv1 = require('uuid/v1');

const router = express.Router()

router.get('', async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    next(error)
  }
})

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${uuidv1()}.jpg`);
  },
});

const upload = multer({ storage });

router.post('', upload.array('media'), async (req, res, next) => {
  try {
    const files = req.files;
    const post = await Post.create({
      _id: new mongoose.Types.ObjectId(),
      media: files.map(file => file.filename),
      ...req.body
    })
    res.json(post)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Post.deleteMany({ '_id': req.params.id })
    res.json(null)
  } catch (error) {
    next(error)
  }
})

module.exports = router