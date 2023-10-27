const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const employeeSchema = new mongoose.Schema({
    employeeCode : {
        type: String,
        unique: [true, "Employee Code should be unique"],
        required: [true, "Employee Code Required"]
    },
    title : String,
    firstName : String,
    lastName : String,
    dob : String,
    address : String,
    city : String,
    state : String,
    contactNumber : {
        type: String,
        required: [true, "Phone number is must"],
        minLength: [10, "Phone should be within 10 digits"],
        maxLength: [10, "Phone should not more than 10 digits"]
          
    },
    designation : String,
    department : String,
    mailId : {
        type: String,
        unique: [true, "Email should be unique"],
        required: [true, "Email Required"]
    },
    doj : String,
    employmentStatus : String,
    reportTo : String
});
employeeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('employee', employeeSchema);