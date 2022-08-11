const mongoose = require('mongoose');
const employeefamilies = require('./EmployeeFamilyModel');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    emp_id: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    dob: {
        type:Date,
        required: true
    },
    doj: {
        type:Date,
        required: true
    },
    Family:{
        type:Schema.Types.ObjectId,
        ref:'employeeFamily'
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("employee",EmployeeSchema)