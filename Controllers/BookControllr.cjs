const BookModel = require("../Model/Book.cjs");

exports.GetAllBook = async function (req, res) {
  try {
    const Books = await BookModel.find();
    return res.json({ Message: "Done", data: Books });
  } catch (err) {
    console.log(err); // log error
    return res.status(400).send({ Message: err }); //  status(400) is a bad request , send msg
  }
};

exports.GetoneBook = async function (req, res) {
  try {
    const Book = await BookModel.findOne({ _id: req.params.id });
    return res.json({ Message: "Done", data: Book });
  } catch (err) {
    console.log(err); // log error
    return res.status(400).send({ Message: err }); //  status(400) is a bad request , send msg
  }
};

exports.addNewBook = async function (req, res) {
  try {
    if (req.body.role === "Admin") {
      const Book = await BookModel.create(req.body);
      return res.json({ Message: "Data Add SuccesFully", data: Book });
    } else {
      return res.status(403).send("Don't Have Access "); //  status(400) is a bad request , send msg
    }
  } catch (err) {
    console.log(err); // log error
    return res.status(403).send({ Message: err }); //  status(400) is a bad request , send msg
  }
};

exports.UpdateBook = async function (req, res) {
  let paylopd = req.body;
  try {
    if (req.body.role === "Admin") {
      let Data = await BookModel.findByIdAndUpdate(req.params.id, paylopd);
      return res.json({ Message: "Data Update SuccesFully", data: Data });
    } else {
      return res.status(403).send("Don't Have Access "); //  status(400) is a bad request , send msg
    }
  } catch (err) {
    console.log(err); // log error
    return res.status(400).send({ Message: err }); //  status(400) is a bad request , send msg
  }
};

exports.DeleteBook = async function (req, res) {
  try {
    if (req.body.role === "Admin") {
      await BookModel.findByIdAndDelete(req.params.id);
      return res.json({ Message: "Data Delete SuccesFully", data: [] });
    } else {
      return res.status(403).send("Don't Have Access "); //  status(400) is a bad request , send msg
    }
  } catch (err) {
    console.log(err); // log error
    return res.status(400).send({ Message: err }); //  status(400) is a bad request , send msg
  }
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWhtZWQiLCJQYXNzd29yZCI6IiQyYiQxMCQ1ZVIxNC5zVzhzTG0wajRMTDVRcUFlaUpyTUVBS0FFLjlKa3lqQ0pGN3JMTFpoalNyNTlYSyIsImVtYWlsIjoibW9vbXVkaTIxMTFAZ21haWwuY29tIiwiYWdlIjoyMiwiaWQiOiI2NjI2YjliOGFhZDBmOTk1YmQ0NDM5NTUiLCJpYXQiOjE3MTM4MTQwMjF9.f9r1JroA4elsVSKJa_9-vyp3MEkQFPEmP9cOu1sNWyY
