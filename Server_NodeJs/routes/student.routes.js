
const router = require("express").Router();

const student = require("../controllers/student.controller.js");

// Retrieve home page
router.get('/', student.home);

// Retrieve about page
router.get('/about', student.about);



module.exports = router;