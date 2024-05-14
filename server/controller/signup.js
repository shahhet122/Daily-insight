const bycrypt = require("bcryptjs");
const verify = require("../models/login");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.createUser = async (req, res) => {
  try {
    const userData = req.body;

    await verify.findOne({ username: userData.username }).then((user) => {
      if (user) {
        return res.send("already exist!!");
      }
      bycrypt
        .hash(userData.password, 12)
        .then((hashedPassword) => {
          const newUserData = {
            username: req.body.username,
            password: hashedPassword,
          };
          verify.create(newUserData);
          const token = jwt.sign(
            { _id: newUserData._id, username: newUserData.username },
            "secret_key"
          );
          res
            .status(200)
            .cookie("token", token, {
              httpOnly : true
            })
            .send();

          // res.status(200).send(newUserData);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (err) {
    res.status(500).send({ err: "Does not create User" });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const userData = req.body;
    const isusername = await verify.findOne({ username: userData.username });
    console.log("1st")
    console.log(userData)
    if (isusername) {
      const checkPass = await bycrypt.compare(
        userData.password,
        isusername.password
      );
      console.log("2nd")
      if (checkPass) {
        const token = jwt.sign(
          { _id: isusername._id, username: isusername.username },
          "secret_key"
        );
        console.log("3rd")
        console.log(token);
        return res
          .status(200)
          .cookie("token", token, {
            httpOnly : true
          })
          .send({ token: token });
        // return res.status(200).send({ token: token });
      } else {
        return res.status(404).redirect("/login");
      }
    } else {
      return res.status(401).send("user not exist");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.logoutUser = (req, res) => {
  try {
    const token = req.cookies.token;
    console.log(token)
    if (token) {
      return res.status(200).cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
      }).json("LOGOUT")
    }
    else {
      return res.json("OKAY")
    }
  } catch (error) {

    console.log(error);

  }
};

exports.cookieCheck = (req, res) => {
  const token = req.cookies.token;
  console.log(token)
  if (token) {
    res.status(200).send(true)
  }
  else {
    res.status(201).send(false)
  }
}
