const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const course = require("./routes/api/course");
const category = require("./routes/api/category");
const enroll = require("./routes/api/enrollRoute");
const role = require("./routes/api/role");
const lecture = require("./routes/api/lecture");
const meetings = require("./routes/api/meeting");
const fileUpload = require("express-fileupload");
var multer = require("multer");
var cors = require("cors");
var logger = require("morgan");
const profile = require("./routes/api/profile");

const message = require("./routes/api/message");
const chat = require("./routes/api/chat");

const app = express();

////////////////// Socket.io //////////////////

const { initialize } = require("./messaging");
const http = require("http");
const server = http.createServer(app);
// Initialize socket.io
initialize(server);

////////////////// Socket.io //////////////////

app.use(logger("dev"));
// Db Config
const db = require("./config/keys").mongoURI;

//Passport middileware
passport.use(passport.initialize());

//passport config will in
require("./config/passport")(passport);
app.use(fileUpload());
//Body Parser
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(bodyParser.json({ limit: "50mb", extended: true }));

//Connect to mongodb through mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

//Use routes
app.use(cors());
app.options("*", cors());
app.use(users);
app.use(course);
app.use(category);
app.use(lecture);
app.use(enroll);
app.use(role);
app.use("/api/meeting", meetings);
app.use("/api/profile", profile);

// For messages
app.use("/api/message", message);
// For chats
app.use("/api/chat", chat);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on Port ${port}`));
