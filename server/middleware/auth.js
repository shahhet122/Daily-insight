const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const verified = jwt.verify(token, "secret_key");
    console.log(verified)
    // console.log(req.username)
    req.username = verified.username
    next()
  } catch (error) {
    res.status(401).json({ message: "unauthorized" });
  }
}
module.exports = auth;
