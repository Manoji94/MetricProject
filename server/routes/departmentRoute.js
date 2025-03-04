const express = require("express");
const departmentController = require('../controllers/departmentController')
const router = express.Router();
 
router.get("/getAllDepartments", departmentController.getAllDepartment)
router.get("/getDepartmentById/:id", departmentController.getDepartmentById)
router.post("/createDepartment", departmentController.createDepartment)
router.put("/updateDepartment/:id", departmentController.updateDepartment)
router.delete("/deleteDepartment", departmentController.deleteDepartment)

module.exports = router;