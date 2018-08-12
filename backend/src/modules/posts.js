const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/post');
const multer = require('multer');
const uuidv1 = require('uuid/v1');

const router = express.Router()

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${uuidv1()}.jpg`);
  },
});

const upload = multer({ storage });

router.post('', upload.single('file'), async (req, res, next) => {
  try {
    const file = req.file;
    const post = await Post.create({
      _id: new mongoose.Types.ObjectId(),
      photoId: file.filename,
      ...req.body
    })
    res.json(post)
  } catch (error) {
    next(error)
  }
})

module.exports = router