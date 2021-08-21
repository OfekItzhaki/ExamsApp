
const router = require("express").Router();

const basic = require("../controllers/basic.controller.js");

// Retrieve home page
router.get('/', basic.home);

// Retrieve about page
router.get('/about', basic.about);



module.exports = router;