"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    regNo: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    class: {
        type: String,
        required: true
    },
    student: [{
        subjectName: String,
        marks: Number
    }],
    isDeleted: {
        type: Boolean,
        default: false,
    },
    toShow: {
        type: Boolean,
        default: false,
    },
    registedOn: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamp: true,
    autoIndex: true,
    versionKey: false,
});

let Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
