let express = require('express');
let router = express.Router();
let student = require("../controllers/student")

router.post("/student", student.registerNewStudent);
router.get("/employees", student.getAllStudents);
router.get("/student/:stuId", student.getSpecificStudent);

module.exports = router;