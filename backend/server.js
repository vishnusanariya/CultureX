const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportStrategy = require("./auth/passport");
const errorHandler = require("./middleware/errorHandler");
const userRoute = require("./routes/userRoutes");
require("dotenv").config();
const app = express();
const cors = require("cors");
const ConnectToDb = require("./db");
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
app.use(errorHandler)
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
