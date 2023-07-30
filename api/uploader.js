const multer = require("multer");
const download = require("image-downloader");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const photosMiddleware = multer({ dest: "uploads/" });

const uploadByLink = async (req, res) => {
  const { link } = req.body;
  try {
    const newName = "photo-" + Date.now() + ".jpg";
    await download
      .image({
        url: link,
        dest: __dirname + "/uploads/" + newName,
      })
      .then(({ filename }) => {
        console.log("Saved to", filename);
      })
      .catch((err) => console.error(err));
    res.json(newName);
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

const upload = async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files?.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace(/uploads\\ ?/g, ""));
  }
  res.json(uploadedFiles);
};

router.post("/upload", photosMiddleware.array("photos", 100), upload);
router.post("/upload-by-link", uploadByLink);

module.exports = router;
