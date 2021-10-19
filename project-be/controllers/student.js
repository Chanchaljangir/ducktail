const Student = require("../models/student");


module.exports = {
    async registerNewStudent(req, res) {
        let respObj = {
            IsSuccess: false,
            Message: "OK.",
            Data: null,
        };
        try {
            let stuFind = await Student.find({
                regNo: req.body.regNo
            }).then(async function (data) {
                if (data) {
                    respObj.IsSuccess = false;
                    respObj.Message = "Student already registered"
                    res.status(200).json(respObj);
                } else {
                    let result = await new Student(req.body).save()
                    respObj.IsSuccess = true;
                    respObj.Message = "Susscefully registered"
                    res.status(200).json(respObj);
                }
            })
            // respObj.IsSuccess = true;
            // respObj.Message = "Susscefully added"
            // res.status(200).json(respObj);

        } catch (err) {
            respObj.error = err;
            (respObj.message = err.message || "Error while processing db query"),
                res.status(500).json(respObj);
        }
    },
    async getAllStudents(req, res) {
        let respObj = {
            IsSuccess: false,
            Message: "OK.",
            Data: null,
        };

        try {
            let result = await Student.find()

            respObj.IsSuccess = true;
            respObj.Data = result
            respObj.Message = "Susscefully get all data"
            res.status(200).json(respObj);

        } catch (err) {
            respObj.error = err;
            (respObj.message = err.message || "Error while processing db query"),
                res.status(500).json(respObj);
        }
    },

    async getSpecificStudent(req, res) {
        let respObj = {
            IsSuccess: false,
            Message: "OK.",
            Data: null,
        };

        try {
            let result = await Student.find({ _id: req.params.stuId })

            respObj.IsSuccess = true;
            respObj.Data = result
            respObj.Message = "Succefully get all data"
            res.status(200).json(respObj);

        } catch (err) {
            respObj.error = err;
            (respObj.message = err.message || "Error while processing db query"),
                res.status(500).json(respObj);
        }
    }
}