import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';


const Employee = () => {

    const [employeeList, setEmployeeList] = useState([]);
    const [empDataId, setEmpDataId] = useState(null)
    const empFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/employee/getAllEmployees`
            );
            setEmployeeList(response.data.result);
            setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        empFetch();
    }, []);

    console.log(employeeList)
    const [filteredData, setFilteredData] = useState([])

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (value === "all") {
            setFilteredData(employeeList)
        } else {
            if (name === "departmentFilter") {
                const departmentFilter = employeeList.filter((item) => (item.department === value))
                setFilteredData(departmentFilter)
            }
            if (name === "employementStatusFilter") {
                const statusFilter = employeeList.filter((item) => (item.employementStatus === value))
                setFilteredData(statusFilter)
            }
            if (name === "reportToFilter") {
                const reportFilter = employeeList.filter((item) => (item.reportTo === value))
                setFilteredData(reportFilter)
            }
        }


    };

    const initialEmpData = {
        employeeCode: "",
        title: "",
        firstName: "",
        lastName: "",
        dob: "",
        address: "",
        city: "",
        state: "",
        contactNumber: "",
        designation: "",
        department: "",
        mailId: "",
        doj: "",
        employmentStatus: "",
        reportTo: ""
    }



    const [employeeData, setEmployeeData] = useState({
        employeeCode: "",
        title: "",
        firstName: "",
        lastName: "",
        dob: "",
        address: "",
        city: "",
        state: "",
        contactNumber: "",
        designation: "",
        department: "",
        mailId: "",
        doj: "",
        employmentStatus: "",
        reportTo: ""
    });

    const handleSetEmp = (emp) => {
        setEmployeeData(emp)
        setEmpDataId(emp._id)
    }
    console.log(empDataId)
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled"  {...props} />;
    });
    const [open, setOpen] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    //open Modal
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }

    //
    //State and City
    const [AllStates, setAllStates] = useState([]);
    const [StateName, setStateName] = useState(null)

    const StateData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/general/getAllStateAndCity`
            );
            setAllStates(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        StateData();
    }, []);
    console.log(AllStates)

    const [cityByState, setCityByState] = useState([])
    const cityFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/general/getCityByStateName/${employeeData.state}`
            );
            setCityByState(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {

        cityFetch();

    }, [employeeData.state]);
    console.log(StateName)
    console.log(cityByState)
    //



    //Department and Designation 
    const [departmentList, setDepartmentList] = useState([]);
    const depFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/department/getAllDepartments`
            );
            setDepartmentList(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        depFetchData();
    }, []);
    console.log(departmentList)


    const [designationList, setDesignationList] = useState([]);
    const desFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/designation/getAllDesignations`
            );
            setDesignationList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        desFetchData();
    }, []);
    console.log(departmentList)


    //

    // Employee Datas
    const [errorhandler, setErrorHandler] = useState({})




    const [phoneMsg, setPhoneMsg] = useState(1)

    console.log(StateName)

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "state") {
            setStateName(value);
        }
        if (name === "contactNumber") {
            if (value.length >= 10 && value.length <= 10) {
                setPhoneMsg(true)
            } else {
                setPhoneMsg(false)
            }
        }

        setEmployeeData((prev) => ({ ...prev, [name]: value }));

    };

    console.log(phoneMsg)
    const EmployeeSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/employee/createEmployee`, employeeData
            );

            setSnackBarOpen(true)
            empFetch();
            console.log("Employee Created Successfully")
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
        } catch (err) {

            setSnackBarOpen(true)




            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(', ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }
        }
    };
    console.log(empDataId)
    const EmployeeUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/employee/updateEmployee/${empDataId}`, employeeData
            );
            empFetch();
            setErrorHandler(response.data.errors)
            console.log("Employee Updated Successfully")
            setSnackBarOpen(true)

        } catch (err) {
            console.log(err);
            setErrorHandler({ status: 0, message: "Error Updating Employee", code: "error" })
            setSnackBarOpen(true)
        }
    };



    console.log(employeeData)
    console.log(employeeList)
    return (
        <div className='container'>
            <form >
                <h1 className='text-center'>Employee Database</h1>
                <div className='row mb-2 g-2'>
                    <div className="form-floating  col-2">
                        <input onChange={handleChange} value={employeeData.employeeCode} type="text" className="form-control" id="employeeCodeId" name="employeeCode" placeholder="employeeCode" />
                        <label htmlFor="employeeCodeId">Emp.code</label>
                    </div>
                    <div class="form-floating  col-1">
                        <select onChange={handleChange} value={employeeData.title} className="form-select" id="titleId" name="title" >
                            <option selected>Title</option>
                            <option value="1">Mr.</option>
                            <option value="2">Ms.</option>

                        </select>
                        <label htmlFor="titleId">Title</label>
                    </div>
                    <div className="form-floating  col">
                        <input onChange={handleChange} value={employeeData.firstName} type="text" className="form-control" id="firstNameId" name="firstName" placeholder="firstName" />
                        <label htmlFor="firstNameId">First Name</label>
                    </div>
                    <div className="form-floating  col">
                        <input onChange={handleChange} value={employeeData.lastName} type="text" className="form-control" id="lastNameId" name="lastName" placeholder="lastName" />
                        <label htmlFor="lastNameId">Last Name</label>
                    </div>
                    <div className="form-floating  col-2">
                        <input onChange={handleChange} value={employeeData.dob} type="date" className="form-control" id="dobId" name="dob" placeholder="dob" />
                        <label htmlFor="dobId">Date Of Birth</label>
                    </div>


                </div>
                <div className='row g-2 mb-2'>
                    <div className="form-floating col-4">
                        <input onChange={handleChange} value={employeeData.address} type="text" className="form-control" id="addressId" placeholder="naddress" name='address' />
                        <label htmlFor="addressId">Address</label>
                    </div>
                    <div className="form-floating col-2">
                        <input onChange={handleChange} value={employeeData.contactNumber} type="number" maxLength={10} className={phoneMsg ? `form-control is-valid` : `form-control is-invalid`} id="contactNumberId" placeholder="contactNumber" name='contactNumber' />
                        <label htmlFor="contactNumberId">Contact Number</label>
                        {phoneMsg ? "" : <div className='invalid-feedback'>Contact must be in 10 digits</div>}
                    </div>

                    <div className="form-floating col-6">
                        <input onChange={handleChange} style={{ textTransform: "lowercase" }} value={employeeData.mailId} type="text" className="form-control" id="mailid" placeholder="name@example.com" name='mailId' />
                        <label htmlFor="mailId">Mail Id</label>
                    </div>
                </div>
                <div className='row g-2 mb-2'>
                    <div class="form-floating md-3 col-4">
                        <select onChange={handleChange} value={employeeData.state} className="form-select" id="stateId" name="state" >
                            <option selected>Select State</option>
                            {AllStates.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label htmlFor="stateId">State</label>
                    </div>

                    <div class="form-floating col-2">
                        <select onChange={handleChange} value={employeeData.designation} className="form-select" id="designationId" name="designation" >
                            <option selected>Designation</option>
                            {designationList.map((item) => (
                                <option key={item._id} value={item.designation}>{item.designation}</option>
                            ))}
                        </select>
                        <label htmlFor="designationId">Designation</label>
                    </div>
                    <div className="form-floating col-3">
                        <input onChange={handleChange} value={employeeData.doj} type="date" className="form-control" id="dojId" name="doj" placeholder="doj" />
                        <label htmlFor="dojId">Date Of joining</label>
                    </div>
                    <div class="form-floating col-3">
                        <select onChange={handleChange} value={employeeData.employmentStatus} className="form-select" id="employmentStatusId" name="employmentStatus" >
                            <option selected>Select Status</option>
                            <option value="1">Active</option>
                            <option value="2">InActive</option>
                            <option value="3">Relieved</option>
                        </select>
                        <label htmlFor="employmentStatusId">Employment Status</label>
                    </div>

                </div>
                <div className='row g-2 mb-2'>
                    <div class="form-floating col-4">
                        <select onChange={handleChange} value={employeeData.city} className="form-select" id="cityId" name="city" >
                            <option selected>City</option>
                            {cityByState.map((item, index) => (
                                <option key={item._id} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                        <label htmlFor="cityId">City</label>
                    </div>
                    <div class="form-floating md-3 col-2">
                        <select onChange={handleChange} value={employeeData.department} className="form-select" id="departmentId" name="department" >
                            <option selected>Select department</option>
                            {departmentList.map((item) => (
                                <option key={item._id} value={item.department}>{item.department}</option>
                            ))

                            }
                        </select>
                        <label htmlFor="departmentId">Department</label>
                    </div>
                    <div class="form-floating md-3 col-6">
                        <select onChange={handleChange} value={employeeData.reportTo} className="form-select" id="reportToId" name="reportTo" >
                            <option selected>Department</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label htmlFor="reportToId">Report To</label>
                    </div>
                </div>
                <div className="row g-2" >
                    <div className="col d-flex ">
                        <div className='me-2' >
                            <label className='uplable'>
                                <input className="form-control downlable" type="file" id="uploadExcel" />Upload
                            </label>
                        </div>
                        <div >
                            <label className='uplable'>
                                <input className="form-control downlable" type="file" id="uploadExcel" />Download
                            </label>
                        </div>
                    </div>
                    {empDataId ? <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Update Confirmation"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure to Update a Employee
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={(e) => { EmployeeUpdate(e); handleClose(); }} autoFocus>
                                Update
                            </Button>
                        </DialogActions>
                    </Dialog> : <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Create Confirmation"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure to Create the Employee
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={(e) => { EmployeeSubmit(e); handleClose(); }} autoFocus>
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>}

                    {/* <Stack sx={{ width: '50%' }} spacing={2}>
                        <Alert severity="error">This is an error alert — check it out!</Alert>
                        <Alert severity="warning">This is a warning alert — check it out!</Alert>
                        <Alert severity="info">This is an info alert — check it out!</Alert>
                        <Alert severity="success">This is a success alert — check it out!</Alert>
                    </Stack> */}
                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '25%' }}>
                            {errorhandler.message}
                        </Alert>
                    </Snackbar>


                    <div className='col d-flex justify-content-end'>
                        {empDataId ? <div className='col d-flex justify-content-end'>
                            <div className='me-2' >
                                <button type="button" onClick={handleClickOpen} className='btn btn-secondary' >Modify</button>
                            </div>
                            <div className='me-2' >
                                <button type="button" className='btn btn-danger' onClick={() => { setEmpDataId(null); setEmployeeData(initialEmpData) }} >Cancel</button>
                            </div>
                        </div> :
                            <div>
                                <button onClick={handleClickOpen} type="button" className='btn btn-warning'>+ Add Employee</button>
                            </div>
                        }




                    </div>




                </div>
                <h3 className='text-center'>Employee List</h3>
                <div className='row g-2 mb-3'>
                    <div class="form-floating md-3 col">
                        <select className="form-select" id="employementStatusFilterId" name="employementStatusFilter" onChange={handleFilterChange}>
                            <option selected value="all">All</option>
                            <option value="1">Active</option>
                            <option value="2">InActive</option>
                            <option value="3">Relieved</option>
                        </select>
                        <label htmlFor="employementStatusFilterId">Employment Status To</label>
                    </div>
                    <div class="form-floating col">
                        <select className="form-select" id="departmentFilterId" name="departmentFilter" onChange={handleFilterChange}>
                            <option selected value="all">All</option>
                            {departmentList.map((item) => (
                                <option key={item._id} value={item.department}>{item.department}</option>
                            ))

                            }
                        </select>
                        <label htmlFor="departmentFilterId">Department</label>
                    </div>
                    <div class="form-floating col">
                        <select className="form-select" id="reportToFilterId" name="reportToFilter" onChange={handleFilterChange}>
                            <option selected value="all">All</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label htmlFor="reportToFilterId">Report To</label>
                    </div>
                </div>
                <div>
                    <table className='table table-bordered'>
                        <tbody>
                            <tr>
                                <th>Emp.Code</th>
                                <th>Emp.Name</th>
                                <th>Contact Number</th>
                                <th>Mail Id</th>
                                <th>Designation</th>
                                <th>Department</th>
                                <th>Report To</th>
                                <th>Delete</th>

                            </tr>
                            {filteredData.map((emp, index) => (
                                <tr key={emp._id} onClick={() => handleSetEmp(emp)}>
                                    <td>{emp.employeeCode}</td>
                                    <td>{emp.firstName + emp.lastName}</td>
                                    <td>{emp.contactNumber}</td>
                                    <td>{emp.mailId}</td>
                                    <td>{emp.designation}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.reportTo}</td>
                                    <td><button type='button' className='btn btn-danger'><i className="bi bi-trash"></i></button></td>
                                </tr>
                            ))}


                        </tbody>


                    </table>
                    {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    <TextField id="filled-basic" label="Filled" variant="filled" />
                    <TextField id="standard-basic" label="Standard" variant="standard" /> */}
                </div>










            </form>


        </div>
    )
}

export default Employee