const express = require("express");
const router = express.Router();

const { uploadByLink } = require("../controllers/uploadController");

router.post("/upload-by-link", uploadByLink);
module.exports = router;
