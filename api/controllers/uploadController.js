// const multer = require("multer");
// const download = require("image-downloader");

// const uploadByLink = async (req, res) => {
//   const { link } = req.body;
//   try {
//     const newName = "photo-" + Date.now() + ".jpg";
//     await download
//       .image({
//         url: link,
//         dest: __dirname + "/uploads/" + newName,
//       })
//       .then(({ filename }) => {
//         console.log("Saved to", filename);
//       })
//       .catch((err) => console.error(err));
//     res.json(newName);
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = { uploadByLink };
