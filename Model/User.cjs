const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userScheam = new Schema({
  // this is the schema of the user collection in the database
  name: String,
  age: Number,
  country: String,
  city: String,
  address: String,
  Phone: { type: String, unique: true },
  email: { type: String, unique: true }, // unique: true means that the email must be unique
  Password: String,
  role: { type: String, default: "User" },
});

userScheam.methods.comparePassword = async function (Password) {
  // this.Password is the password in the database
  return await bcrypt.compare(Password, this.Password); // this.Password is the password in the database
};
module.exports = mongoose.model("user", userScheam); // user is the name of the collection in the database
