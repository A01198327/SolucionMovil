const express = require("express");
const router = express.Router();
const images = require("../services/images");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // upload folder
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST
router.post('/', upload.single('file'), async function (req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const uploadedFile = req.file.path;
    await images.insertImage(uploadedFile);

    res.status(201).json({ success: true, message: "File uploaded successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
