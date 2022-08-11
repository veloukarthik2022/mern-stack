const express = require('express');
const router = express.Router();
const { Login, Register } = require('../Controllers/UserController')
const { getEmployees, getEmployee,
    storeEmployee, updateEmployee,
    deleteEmployee, storeEmployeeFamily,
    updateEmployeeFamily, deleteEmployeeFamily } = require('../Controllers/EmployeeController');
const verifyToken = require('../middleware/verifyToken')

router.post('/login', Login);

router.post('/register', Register);

router.get('/employee', verifyToken, getEmployees)

router.get('/employee/:id', verifyToken, getEmployee)

router.post('/employee', verifyToken, storeEmployee)

router.post('/employee/:id', verifyToken, updateEmployee)

router.delete('/employee/:id', verifyToken, deleteEmployee)

router.post('/employee_family', verifyToken, storeEmployeeFamily)

router.post('/employee_family/:id', verifyToken, updateEmployeeFamily)

router.delete('/employee_family/:id', verifyToken, deleteEmployeeFamily)

module.exports = router;