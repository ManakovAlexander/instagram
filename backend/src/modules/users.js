const express = require('express')
const mongoose = require('mongoose');
const User = require('../models/user')

const router = express.Router()

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({ '_id': req.params.id }).exec()
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('', async (req, res, next) => {
  try {
    const user = await User.create({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    })
    res.json(user._id)
  } catch (error) {
    next(error)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    await User.findOneAndUpdate({ '_id': req.params.id }, req.body)
    res.json()
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.params.id)
    res.json()
  } catch (error) {
    next(error)
  }
})

module.exports = router