const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportStrategy = require("./auth/passport");
const errorHandler= require('./middleware/errorHandler');
const userRoute = require('./routes/userRoutes');
require("dotenv").config();
const app = express();
const cors=require('cors');
const multer = require('multer');
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
app.get('/', (req, res) => {
	res.send("Welcome")
});
app.use("/auth",userRoute );
const fileUpload=multer();
app.post('/upload',fileUpload.single('image'),(req,res)=>{
	let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };
	async function upload(req) {
        let result = await streamUpload(req);
        console.log(result);
    }

    upload(req);
} );
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));