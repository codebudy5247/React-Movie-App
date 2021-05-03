const express = require("express");
const logger =require("morgan");
const colors =  require("colors");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

dotenv.config();

//Connect to DB
const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/tmdb", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const cookieParser = require("cookie-parser");


app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));
app.use('/api/favorite', require('./routes/favorite'));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
app.get("/", (req, res) => {
  res.send("API is running....");
});

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);