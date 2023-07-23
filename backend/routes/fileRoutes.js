const asyncHandler = require("express-async-handler");
const multer = require("multer");
const express = require("express");
const Media = require("../models/mediaSchema");
const router = require("express").Router();
const fs = require("fs");
const path = require("path");

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
      res.status(400);
      throw new Error("please upload file");
    } else if (
      !file.mimetype.includes("image") &&
      !file.mimetype.includes("video")
    ) {
      res.status(400);
      throw new Error(
        `Please upload file with image or video properties ${file.mimetype} not allowed`
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
//to serve the image files
router.use(express.static("uploads"));

//to serve the video files
router.get("/video/:filename", (req, res) => {
  const fileName=req.params.filename;
  const videoPath=path.resolve(".",`uploads/${fileName}`);
  if(!videoPath){
    res.status(404);
    throw new Error(`Video:${fileName} not found`);

  }
  const stat=fs.statSync(videoPath);
  const filesize=stat.size;
  const range=req.headers.range;
  if(range){
    const parts=range.replace(/bytes=/,'').split('-');
    const start=parseInt(parts[0],10);
    const end=parts[1]?parseInt(parts[1],10):filesize-1;
    const chunkSize=end-start+1;
    const file= fs.createReadStream(videoPath,{start,end})
    const head={
      'Content-Range':`bytes ${start}-${end}/${filesize}`,
      'Accept-Ranges':'bytes',
      'Content-Length':chunkSize,
      'Content-Type':'video/mp4'
    };
    res.writeHead(206,head);
    file.pipe(res);
  }else{
    const head={
      'Content-Length':filesize,
      'Content-Type':'video/mp4'
    };
    res.writeHead(200,head);
    fs.createReadStream(videoPath).pipe(res)
  }
});
module.exports = router;
