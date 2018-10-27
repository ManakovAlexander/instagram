const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('', passport.authenticate('local'), async (req, res, next) => {
  res.json({ test: 'test' });
});

module.exports = router;