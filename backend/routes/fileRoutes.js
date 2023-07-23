const asyncHandler = require("express-async-handler");
const multer = require("multer");
const express = require("express");
const Media = require("../models/mediaSchema");
const router = require("express").Router();
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for storing files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use a unique filename
  },
});

const fileUpload = multer({ storage: storage });
//upload file
router.post(
  "/upload",
  fileUpload.single("file"),
  asyncHandler(async (req, res) => {
    const file = req.file;
    const user = req.body.user;
    if (!file) {
      return res.status(400).json({ error: "please upload file" });
    } else if (
      !file.mimetype.includes("image") &&
      !file.mimetype.includes("video")
    ) {
      res.status(400);
      throw new Error(
        `Please upload file with image or video properties:${file.mimetype}`
      );
    }
    const media = new Media({
      owner: user,
      type: file.mimetype.startsWith("image") ? "image" : "video",
      fileName: file.filename,
      filePath: file.filename,
    });
    try {
      await media.save();
      res.status(200).json({ message: "File uploaded successfully" });
    } catch (err) {
      res.status(500);
      throw new Error("Error uploading file");
    }
  })
);

router.get(
  "/files/:email",
  asyncHandler(async (req, res) => {
    try {
      const userEmail = req.params.email;
      const files = await Media.find({ owner: userEmail });
      res.status(200).json(files);
    } catch (err) {
      console.error(err);
    }
  })
);
// router.get('/video/:name',asyncHandler(async (req, res) => {

// }))
router.use(express.static("uploads"));
router.get(
  "/:name",
  asyncHandler(async (req, res) => {
    console.log("get media");
    try {
      const file = await Media.findOne({ fileName: req.params.name });
      console.log("file info:", file, req.params.name);
      if (file.type.startsWith("image")) {
        const ff = fs.readFile(`/uploads/${file.fileName}`);
        res.send(ff);
      } else if (file.type.startsWith("video")) {
        const range = req.headers.range;
        if (!range) res.status(400).send("error");

        const videoPath = "test.mp4";
        const videoSize = fs.statSync(videoPath).size;

        const chunkSize = 10 ** 6;
        // bytes=64165
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + chunkSize, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
          "Content-Range": `bytes ${start}-${end}/${videoSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers);

        const videoStream = fs.createReadStream(videoPath, { start, end });

        videoStream.pipe(res);
      }
    } catch (err) {
      console.error(err);
    }
  })
);

module.exports = router;
