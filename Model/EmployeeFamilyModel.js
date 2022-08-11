const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const EmployeeFamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    emp_id: {
        type: String,
    },
    age: {
        type: String,
        required: true
    },
    relation: {
        type: String,
        required: true
    }
},
    { collection: 'employeefamilies' },
    { timestamps: true }
);

module.exports = mongoose.model("employeeFamily", EmployeeFamSchema)