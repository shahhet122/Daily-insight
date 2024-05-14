const express = require("express");
const router = express.Router();
const controller = require('../controller/bookmark_articles')
// const auth = require("../middleware/auth")

// store bookmark Article
router.post('/bookmark'  ,controller.postArticle)

// read bookdmark articles
router.get('/view' ,controller.getArticle)


module.exports = router;