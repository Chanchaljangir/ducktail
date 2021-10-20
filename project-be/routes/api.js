let express = require('express');
let router = express.Router();
let student = require("../controllers/student")

router.post("/student", student.registerNewStudent);
router.get("/students", student.getAllStudents);
router.get("/studentById/:stuId", student.getSpecificStudent);
router.put("/student/:stuId", student.updateStudentRecord);
module.exports = router;