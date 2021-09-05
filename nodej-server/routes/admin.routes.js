
const router = require("express").Router();

const admin = require("../controllers/admin.controller.js");

// Retrieve home page
router.get('/', admin.home);

// Retrieve about page
router.get('/about', admin.about);



module.exports = router;