const express = require("express");
const router = express.Router();
const controller = require("../controller/signup");


// for signup user
router.post("/signup", controller.createUser);
// for login user
router.post("/login", controller.loginUser);
// logout user
router.post("/logout", controller.logoutUser);
// authenticate user for every request
router.post("/cookieCheck", controller.cookieCheck)


module.exports = router;
