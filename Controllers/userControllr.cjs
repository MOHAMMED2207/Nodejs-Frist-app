const UserModel = require("../Model/User.cjs");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

exports.register = async function (req, res) {
  try {
    // try catch to catch error
    let NewUser = new UserModel(req.body); // Data From UserModel(--all data in body--)
    const HandelPassword = await bcrypt.hash(req.body.Password, 10); // HandelPassword insiad work bcrypt.hash its need me 2 argument 1-req.body.Password 2-salt or number of time to hash
    NewUser.Password = HandelPassword; // old Password = new hash Password
    let User = await NewUser.save(); // save user in database
    let { name, Password, email, age, Phone, country } = User; // obj data from user becuase return this in res.json and i want to return this in userRegister
    let UserRegister = {
      // obj data from user
      name: name,
      Password: Password,
      email: email,
      age: age,
      Phone: Phone,
      country: country,
    };
    return res.json({
      // return res.json
      Message: "User Register Succesfully", //msg
      status: 200, // story is succesd
      User: UserRegister, // data from user
    });
  } catch (err) {
    console.log(err); // log error
    return res.status(400).send({ Message: err }); //  status(400) is a bad request , send msg
  }
};
// --------------------------------------------------------------------------------------------------------
exports.login = async function (req, res) {
  try {
    let user = await UserModel.findOne({ email: req.body.email }); // find user in database
    if (!user || !user.comparePassword(req.body.Password)) {
      // if user not found or password not match
      return res.status(401).send({
        // status(401) is a unauthorized , send msg
        Message: "Authntication Failed , Invalid username or password",
      });
    }
    const Token = Jwt.sign(
      // create token
      {
        name: user.name,
        Password: user.Password,
        email: user.email,
        age: user.age,
        id: user._id,
      },
      "secuirtkey" // secret key
    );
    let { name, Password, email, age } = user; // destructing
    let UserRegister = {
      name: name,
      Password: Password,
      email: email,
      age: age,
      Token: Token,
    };

    return res.json({
      // return user data and token
      Message: "User Login Succesfully", // msg
      status: 200, // status(200) is a ok , send msg
      User: UserRegister, // user data
    });
  } catch (err) {
    console.log(err); // log error
    return res.status(400).send({ Message: err }); // return error
  }
};

exports.GetAllUser = async (req, res) => {
  try {
    let FilterUser = await UserModel.find(); // find user in database
    return res.json({
      // return res.json
      Message: "Data is Succesfully", //msg
      status: 200, // story is succesd
      User: FilterUser, // data from user
    });
  } catch (err) {
    console.log(err); // log error
    return res.status(400).send({ Message: err }); //  status(400) is a bad request , send msg
  }
};

exports.GetOneUser = async (req, res) => {
  try {
    let FilterUser = await UserModel.findOne({ _id: req.params.id }); // find user in database

    return res.json({
      // return res.json
      Message: "Data is Succesfully", //msg
      status: 200, // story is succesd
      User: FilterUser, // data from user
    });
  } catch (err) {
    console.log(err); // log error
    return res.status(400).send({ Message: err }); //  status(400) is a bad request , send msg
  }
};

//  Register Test Data
// {
//   "name": "Mohamed",
//   "Phone": "01152237712",
//   "age": "22",
//   "country": "Egypt"
//   "email": "moomudi21@gmail.com",
//   "Password": "123Mody123",
// }
// ,{
//     "name": "Khaled",
//     "Password": "123123",
//     "email": "khaledftah205@gmail.com",
//     "age": "18",
//     "Phone": "01129362915",
//     "country": "Egypt"
// }

//  Logn Test Data
// {
//   "email": "moomudi21@gmail.com",
//   "Password": "123Mody123",
// }
