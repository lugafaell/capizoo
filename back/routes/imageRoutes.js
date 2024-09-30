const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/s3-config");

const router = express.Router();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "animal-images-capizoo",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

router.post("/upload", upload.array("images", 10), (req, res) => {
  const imageUrls = req.files.map((file) => file.location);

  res.json({ imageUrls });
});

module.exports = router;
