const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
var cors = require("cors");

//Import Routes
const authRoutes = require("./routes/auth");

dotenv.config();
//Connect to DATABASE
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (error) => {
    if (!error) {
      console.log(`Connected to MongoDB Database`);
    } else {
      console.error(error);
      console.log("Error Connecting to Database");
    }
  }
);

const app = express();
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));

//Enabling CORS
app.use(cors());

//Log requests and responses on console
app.use(morgan("dev"));

//Routes Middlewares
app.use("/api/user", authRoutes);

port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
