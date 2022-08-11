
const Employee = require('../Model/EmployeeModel');
const EmployeeFam = require('../Model/EmployeeFamilyModel');
var ObjectID = require('mongodb').ObjectID;

const getEmployees = async (req, res) => {

    let employeeDetails = [];


    let employee = await Employee.aggregate([{
        $lookup: {
            from: "employeefamilies", // collection to join
            localField: "emp_id",//field from the input documents
            foreignField: "emp_id",//field from the documents of the "from" collection
            as: "employeefamily"// output array field
        },
    }]);


    res.status(200).json({ "status": "success", "data": employee });
}

const getEmployee = async (req, res) => {



    let employee = await Employee.aggregate([
        {$match: { emp_id: req.params.id }},
        {$lookup: {
            from: "employeefamilies", // collection to join
            localField: "emp_id",//field from the input documents
            foreignField: "emp_id",//field from the documents of the "from" collection
            as: "employeefamily"// output array field
        }}
    ]
    );

    res.status(200).json({ "status": "success", "data": employee });
}

const storeEmployee = async (req, res) => {
    const { name, emp_id, role, dob, doj } = req.body;
    let employee = await Employee.create({ name: name, emp_id: emp_id, role: role, dob: dob, doj: doj });

    if (employee) {
        res.status(200).json({ "status": "success", "message": "Employee store successfully" });
    }
    else {
        res.status(422).json({ "status": "error", "message": "Employee not stored successfully" });
    }

}

const updateEmployee = async (req, res) => {
    const { name, emp_id, role, dob, doj } = req.body;
    let employee = await Employee.findOneAndUpdate({ _id: req.params.id }, { name: name, emp_id: emp_id, role: role, dob: dob, doj: doj },{new:true});

    if (employee) {
        res.status(200).json({ "status": "success", "message": "Employee updated successfully","data":employee });
    }
    else {
        res.status(422).json({ "status": "error", "message": "Employee not updated successfully" });
    }

}

const deleteEmployee = async (req, res) => {
    const { name, emp_id, role, dob, doj } = req.body;

    let empDetail = await Employee.find({ _id: req.params.id });

    let familyDetail = await EmployeeFam.findOneAndDelete({ emp_id: empDetail.emp_id });

    console.log(empDetail.emp_id);

    let employee = await Employee.findOneAndDelete({ _id: req.params.id });

    if (employee || familyDetail) {
        res.status(200).json({ "status": "success", "message": "Employee deleted successfully" });
    }
    else {
        res.status(422).json({ "status": "error", "message": "Employee not deleted successfully" });
    }

}

const storeEmployeeFamily = async (req, res) => {
    const { name, emp_id, age, relation } = req.body;
    
    let employee = await EmployeeFam.create({ name: name, emp_id: emp_id, age: age, relation: relation });

    if (employee) {
        res.status(200).json({ "status": "success", "message": "Employee family details store successfully" });
    }
    else {
        res.status(422).json({ "status": "error", "message": "Employee family not stored successfully" });
    }

}

const updateEmployeeFamily = async (req, res) => {
    // const { name, emp_id, age, relation } = req.body;
    // name: name, emp_id: emp_id, age: age, relation: relation
    
    //  res.json(req.body);
    //  return;
    const {id} = req.params
    let employee = await EmployeeFam.findOneAndUpdate({ _id: ObjectID(id) }, { ...req.body },{new:true});

    if (employee) {
        res.status(200).json({ "status": "success", "message": "Employee family details updated successfully","data":employee });
    }
    else {
        res.status(422).json({ "status": "error", "message": "Employee family not updated successfully" });
    }

}

const deleteEmployeeFamily = async (req, res) => {
    const { name, emp_id, age, relation } = req.body;
    let employee = await EmployeeFam.findOneAndDelete({ _id: req.params.id }, { name: name, emp_id: emp_id, age: age, relation: relation });

    if (employee) {
        res.status(200).json({ "status": "success", "message": "Employee family details deleted successfully" });
    }
    else {
        res.status(422).json({ "status": "error", "message": "Employee family not deleted successfully" });
    }

}




module.exports = {
    getEmployees,
    getEmployee,
    storeEmployee,
    storeEmployeeFamily,
    updateEmployee,
    deleteEmployee,
    updateEmployeeFamily,
    deleteEmployeeFamily
}