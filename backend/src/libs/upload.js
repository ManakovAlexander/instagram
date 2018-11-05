const multer = require('multer');
const uuidv1 = require('uuid/v1');

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${uuidv1()}.jpg`);
  }
});

module.exports = multer({ storage });
