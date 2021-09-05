
const router = require("express").Router();

const shared = require("../controllers/shared.controller.js");

// Retrieve home page
router.get('/', shared.home);

// Retrieve about page
router.get('/about', shared.about);



module.exports = router;