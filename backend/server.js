const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportStrategy = require("./auth/passport");
const errorHandler = require("./middleware/errorHandler");
const asyncHandler = require("express-async-handler");
const userRoute = require("./routes/userRoutes");
require("dotenv").config();
const app = express();
const cors = require("cors");
const multer = require("multer");
const ConnectToDb = require("./db");
const Media = require("./models/mediaSchema");
const User = require("./models/userSchema");
const fs = require("fs");
ConnectToDb();

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.use("/auth", userRoute);
app.use("/media",require('./routes/fileRoutes'))
app.get("/video/:filename", (req, res) => {
  const fileName=req.params.filename;
  const videoPath=`uploads/${fileName}`;
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
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
