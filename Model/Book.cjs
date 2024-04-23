const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const BookScheam = new Schema({
  // this is the schema of the user collection in the database
  name: String,
  author: String,
  price: Number,
  description: String,
  //   image: String,
  //   category: String,
});

module.exports = mongoose.model("Books", BookScheam); // user is the name of the collection in the database
