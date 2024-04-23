const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./Routes/userRot.cjs");
const BookRouter = require("./Routes/BookRot.cjs");
const app = express();
app.use(bodyParser.json());
app.use("/", userRouter);
app.use("/", BookRouter);

// ---------------------------------------------------------------------------------------------------------------------
const uri = "mongodb+srv://DataPrograming:123DataPrograming123@dataprograming.4an3udx.mongodb.net/ApiServer"; //
const connect = async () => {
  try {
    mongoose.set("strictQuery", false); //
    mongoose.connect(uri); // conmect url to mongoDB
    console.log("connected to mongoDB");
  } catch (err) {
    //
    console.log(err);
    process.exit();
  }
};
connect();
// ---------------------------------------------------------------------------------------------------------------------

//
app.listen(8080); //  is port number
//
