const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const bookMark = require("../models/bookmark")
const verify = require("../models/login");

exports.postArticle = async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = jwt.verify(token, "secret_key");
    if (verified) {
      const authData = req.body;
      console.log(authData.title)

      const booked = await verify.findOne(
        {
          username: verified.username,
          "bookmark.title": authData.title,
          "bookmark.description": authData.description,
        },
      )
      console.log(booked);
      if (!booked) {
        const finalBooked = await verify.findOneAndUpdate(
          { username: verified.username },
          { $push: { bookmark: [authData] } }
        )
        res.status(200).send(finalBooked);
      } else {
        return res.status(400).json({ error: 'Bad request', message: 'data already exist' });
      }

    } else {
      return res.status(404).json("unauthorized");
    }
  } catch (error) {
    res.status(404).send({ error: "error no register succesfully" });
  }
};

exports.getArticle = async (req, res) => {
  try {
    console.log("checking bookmark")
    const token = req.cookies.token;
    const verified = jwt.verify(token, "secret_key");
    if (verified) {
      await verify
        .findOne({ username: verified.username })
        .then((result) => {
          console.log(result.bookmark)
          res.status(200).send(result.bookmark)
        });

    }
  } catch (error) {
    res.status(404).send({ error: "error no register succesfully" });
  }
};
// try {
//   const token = req.cookies.token;
//   const verified = jwt.verify(token, "secret_key");
//   if (verified) {
//     const authData = req.body;
//     await verify
//       .findOneAndUpdate(
//         { username: verified.username },
//         { $push: { bookmark: [authData] } }
//       )
//       .then((user) => {
//         console.log(user);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     res.send("completed");
//   } else {
//     return res.status(404).json("unauthorized");
//   }
// } 