const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const uri =
  "mongodb+srv://ayushmalik595:Hello1234@cluster-1.iqkpx.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log(`MongoDB database connection established successfully`);
});

//routes
app.post("/signup", (req, res, next) => {
  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  newUser
    .save()
    .then(() => res.json("User Added"))
    .catch((err) => res.status(400).json("Error:", err));
});

app.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err)
      return res.status(500).json({
        title: "server error",
        error: err,
      });
    if (!user) {
      return res.status(401).json({
        title: "user not found",
        error: "Invalid user",
      });
    }
    //incorrect password
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: "login failed",
        error: "invalid credentials",
      });
    }
    var token = jwt.sign({ userId: user._id }, "secretKey");
    return res.status(200).json({
      title: "login success",
      token: token,
    });
  });
});

app.get('/user', (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) return res.status(401).json({
      title: 'unauthorized'
    })
    console.log(decoded)
    //token is valid
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err)
      return res.status(200).json({
        title: 'user grabbed',
        user: {
          email: user.email,
          username: user.username
        }
      })
    })
  })
})

const port = 5000;

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Serever running on port", port);
});
