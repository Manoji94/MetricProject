const express = require("express");
const designationController = require('../controllers/designationController')
const router = express.Router();
 
router.get("/getAllDesignations", designationController.getAllDesignations)
router.get("/getDesignationById/:id", designationController.getDesignationById)
router.post("/createDesignation", designationController.createDesignation)
router.put("/updateDesignation/:id", designationController.updateDesignation)
router.delete("/deleteDesignation", designationController.deleteDesignation)
//router.get("/getDesignationByData/:id", designationController.getDesignationByData)
module.exports = router;