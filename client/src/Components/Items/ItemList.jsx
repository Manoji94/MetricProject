import React, { useEffect, useState } from 'react'
import { TextField, MenuItem, Button } from '@mui/material';
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import {Edit, FilterAlt} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Link } from 'react-router-dom';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const ItemList = () => {
   
    console.log(dayjs("2023-11-17").isSameOrBefore("2023-11-21"))
    const [itemList, setItemList] = useState([]);

    const itemFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
            );
            // You can use a different logic for generating the id

            setItemList(response.data.result);
            setFilteredItemListData(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemFetch();
    }, []);

    const [today, setToday] = useState(dayjs().format('YYYY-MM-DD'))
    console.log(today)


    const [itemAddList, setItemAddList] = useState([]);

    const itemAddFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByIMTESort`
            );
            // You can use a different logic for generating the id

            setItemAddList(response.data.result);


        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemAddFetch();
    }, []);





    const columns = [
        {field: 'button', headerName: 'Edit', width: 70, renderCell: (params) => <Button component={Link} to={`/itemedit/${params.id}`}><Edit color='success' /></Button>, align:"center" },
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, align: "center" },
        { field: 'itemIMTENo', headerName: 'ItemIMTE No', width: 80, align: "center" },
        { field: 'itemMasterName', headerName: 'item Description', width: 90, align: "center" },
        { field: 'itemRangeSize', headerName: 'Item Range Size', width: 100, align: "center" },
        { field: 'itemMake', headerName: 'Item Make', width: 110, align: "center" },
        { field: 'itemCalDate', headerName: 'Item Cal Date', width: 130, align: "center" },
        { field: 'itemDueDate', headerName: 'Item Due Date', width: 140, align: "center" },
        { field: 'itemLC', headerName: 'itemLC', width: 120, align: "center" },
        { field: 'itemCalFreInMonths', headerName: 'Frequency(in months)', type: "number", width: 170, align: "center" },
        { field: 'itemCalibrationSource', headerName: 'Item Calibration Src', width: 190, align: "center" },
        { field: 'itemSupplier', headerName: 'Item Supplier', renderCell: (params) => params.row.itemSupplier.toString(), width: 180, align: "center" },
        { field: 'itemType', headerName: 'Item Type', width: 190, align: "center" },
    ];

    const [filteredItemListData, setFilteredItemListData] = useState([])

    const handleFilterChangeItemList = (e) => {
        const { name, value } = e.target;
        console.log(e)
        if (value === "all") {
            setFilteredItemListData(itemList)
        } else {
            if (name === "imteNo") {
                const imteNo = itemList.filter((item) => (item.itemIMTENo === value))
                setFilteredItemListData(imteNo)

            }
            if (name === "itemType") {
                const itemType = itemList.filter((item) => (item.itemType === value))
                console.log(itemType)
                setFilteredItemListData(itemType)


            }
            if (name === "currentLocation") {
                const currentLocation = itemList.filter((item) => (item.itemDepartment === value))
                setFilteredItemListData(currentLocation)
            }
            if (name === "customerWise") {
                const customerWise = itemList.filter((item) => item.itemSupplier.includes(value))
                setFilteredItemListData(customerWise)
            }
            if (name === "supplierWise") {

                const supperlierWise = itemList.filter((item) => item.itemSupplier.includes(value))
                console.log(supperlierWise)
                setFilteredItemListData(supperlierWise)
            }
            if (name === "partName") {
                const partName = itemList.filter((item) => (item.itemPartName === value))
                setFilteredItemListData(partName)
            }

            if (name === "status") {
                const partName = itemList.filter((item) => (item.itemStatus === value))
                setFilteredItemListData(partName)
            }


        }


    };


    {/* const dueDatePicker = (newValue, name) => {
        let startDate = "";
        let endDate = "";
        let startDueDate = "";
        let endDueDate = "";

        // console.log(newValue.format("YYYY-MM-DD"));

        if (name === "dueStartDate") {
            startDate = newValue.format("YYYY-MM-DD");
        }
        if (name === "dueEndDate") {
            endDate = newValue.format("YYYY-MM-DD");
        }

       
            const filteredData = itemList.filter((item) => {
                console.log(item.itemDueDate)
                return (
                    item.itemDueDate >= startDate && item.itemDueDate <= endDate)

            }

            );
            console.log(filteredData)
      


    };*/}
    const dueDatePicker = (newValue, name) => {
        let startDate = "";
        let endDate = "";
        let startDueDate = "";
        let endDueDate = "";


        if (name === "dueStartDate") {
            startDate = newValue.format("YYYY-MM-DD");
        }
        if (name === "dueEndDate") {
            endDate = newValue.format("YYYY-MM-DD");
        }

        const filteredData = itemList.filter((item) => {
            console.log(item.itemDueDate);

            // Assuming item.itemDueDate is a valid date
            const itemDueDate = new Date(item.itemDueDate);

            return (
                (startDate === "" || itemDueDate >= new Date(startDate)) &&
                (endDate === "" || itemDueDate <= new Date(endDate))
            );
        });

        console.log(filteredData);
    };


    const [supplierList, setSupplierList] = useState([])

    const [customerList, setCustomerList] = useState([])

    const vendorFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            console.log(response.data)
            const customersList = response.data.result.filter((item) => item.customer === "1")
            const suppliersList = response.data.result.filter((item) => item.supplier === "1")
            setSupplierList(suppliersList);
            setCustomerList(customersList);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetch();
    }, []);

    const [departmentList, setDepartmentList] = useState([]);

    const depFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/department/getAllDepartments`
            );
            setDepartmentList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        depFetchData();
    }, []);


    const [partDataList, setPartDataList] = useState([])
    const partFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/part/getAllParts`
            );
            setPartDataList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        partFetchData();
    }, []);

    const [dueDate, setDueDate] = useState("")

    const handleDueChange = (e) => {
        const { value } = e.target;
        setDueDate(value)
        const currentDate = dayjs();

        // Example: Filtering data for the last 7 days
        const sevenDaysAgo = currentDate.add(7, 'day');
        const fifteenDaysAgo = currentDate.add(15, 'day');
        const thirtyDaysAgo = currentDate.add(30, 'day');
        // console.log(sevenDaysAgo.format("YYYY-MM-DD"))

        if (value === "all") {
            setFilteredItemListData(itemList)
        } else {
            

            if(value === "Past"){
                const pastData = itemList.filter((item)=> dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
                setFilteredItemListData(pastData)
                console.log("past")
            }
            if(value === "Today"){
                const CurrentDue = itemList.filter((item)=> dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
                console.log(dayjs().isSame(currentDate))
                setFilteredItemListData(CurrentDue)
            }
            if (value === "7") {
                
                const filteredDataLast7Days = itemList.filter((item) => {
                    console.log(item.itemDueDate)
                    return (dayjs(item.itemDueDate).isSameOrBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isSameOrAfter(currentDate.format("YYYY-MM-DD")))
                })
                console.log(dayjs("2023-11-11").isBefore(sevenDaysAgo))
                console.log(filteredDataLast7Days)
                setFilteredItemListData(filteredDataLast7Days)
            }
            if (value === "15") {
               
                const fifteenDaysFilter = itemList.filter((item) => {
                    console.log(item.itemDueDate)
                    return (dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
                })
                setFilteredItemListData(fifteenDaysFilter)
            }
            if (value === "30") {
               
                const thirtyDaysFilter = itemList.filter((item) => {
                    console.log(item.itemDueDate)
                    return (dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
                })
                setFilteredItemListData(thirtyDaysFilter)
            }

            if (value === ">30") {
               
                const thirtyDaysFilter = itemList.filter((item) => {
                    console.log(item.itemDueDate)
                    return (dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))
                })
                setFilteredItemListData(thirtyDaysFilter)
            }

            if(value === "Date"){
                setFilteredItemListData(itemList)
            }

        }



    }
    const [itemId, setItemId] = useState("")

    const handleRowClick = async (params) => {
        console.log(params)
        setItemId(params.id)
    }








    return (
        <div style={{ margin: "2rem" }}>
            <form>
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <Paper sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        mb: 1,

                    }} elevation={12}
                    >
                        <div className='row g-2  '>
                            <Typography variant="h5" className="text-center mb-2">Item List</Typography>

                            <div className="col d-flex mb-2 ">

                                <TextField label="Imte No"
                                    id="imteNoId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    size="small"
                                    onChange={handleFilterChangeItemList}
                                    name="imteNo" >
                                    <MenuItem value="all">All</MenuItem>
                                    {itemAddList.map((item, index) => (
                                        <MenuItem key={index} value={item.itemIMTENo}>{item.itemIMTENo}</MenuItem>
                                    ))}
                                </TextField>

                            </div>
                            <div className="col d-flex  mb-2">

                                <TextField label="Item Type"
                                    id="itemTypeId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    onChange={handleFilterChangeItemList}
                                    size="small"
                                    name="itemType" >
                                    <MenuItem value="all">All</MenuItem >
                                    <MenuItem value="Attribute">Attribute</MenuItem >
                                    <MenuItem value="Variable">Variable</MenuItem >
                                    <MenuItem value="ReferenceStandard">Reference Standard</MenuItem >
                                </TextField>

                            </div>
                            <div className="col d-flex  mb-2">

                                <TextField label="Current Location"
                                    id="currentLocationId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    onChange={handleFilterChangeItemList}
                                    size="small"
                                    name="currentLocation" >
                                    <MenuItem value="all">All</MenuItem>
                                    {departmentList.map((item, index) => (
                                        <MenuItem key={index} value={item.department}>{item.department}</MenuItem>
                                    ))}

                                </TextField>

                            </div>
                            <div className="col d-flex  mb-2">

                                <TextField label="Customer Wise"
                                    id="customerWiseId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    size="small"
                                    onChange={handleFilterChangeItemList}
                                    name="customerWise" >
                                    <MenuItem value="all">All</MenuItem>
                                    {customerList.map((item, index) => (
                                        <MenuItem key={index} value={item.aliasName}>{item.aliasName}</MenuItem>
                                    ))}
                                </TextField>

                            </div>
                            <div className="col d-flex  mb-2">

                                <TextField label="supplier Wise"
                                    id="supplierWiseId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    size="small"
                                    onChange={handleFilterChangeItemList}
                                    name="supplierWise" >
                                    <MenuItem value="all">All</MenuItem>
                                    {supplierList.map((item, index) => (
                                        <MenuItem key={index} value={item.aliasName}>{item.aliasName}</MenuItem>
                                    ))}
                                </TextField>

                            </div>
                            <div className="col d-flex  mb-2">

                                <TextField label="Due In Days"
                                    id="dueInDaysId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    size="small"
                                    onChange={handleDueChange}
                                    name="dueInDays" >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="Past">Past</MenuItem >
                                    <MenuItem value="Today">Today</MenuItem >
                                    <MenuItem value="7">7</MenuItem >
                                    <MenuItem value="15">15</MenuItem >
                                    <MenuItem value="30">30</MenuItem >
                                    <MenuItem value=">30">{'>'}30</MenuItem >
                                    <MenuItem value="Date">Date</MenuItem >

                                </TextField>

                            </div>
                            <div className="col d-flex  mb-2">

                                <TextField label="Part Name"
                                    id="partNameId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    size="small"
                                    onChange={handleFilterChangeItemList}

                                    name="partName" >
                                    <MenuItem value="all">All</MenuItem>
                                    {partDataList.map((item, index) => (
                                        <MenuItem key={index} value={item.partName}>{item.partName}</MenuItem>
                                    ))}
                                </TextField>

                            </div>
                            <div className="col d-flex  mr-1 ">

                                <TextField label="Plant Wise"
                                    id="plantWiseId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    size="small"
                                    onChange={handleFilterChangeItemList}
                                    name="plantWise" >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="Reference Standard">Reference Standard</MenuItem>
                                </TextField>

                            </div>


                        </div>
                        <div className='row g-2'>


                            <div className="col d-flex  g-2 mb-2">

                                <div className='col-3'>
                                    <TextField label="Status"
                                        id="statusId"
                                        select
                                        defaultValue="Active"
                                        fullWidth
                                        size="small"
                                        name="status"
                                        onChange={handleFilterChangeItemList}>

                                        <MenuItem value="all">All</MenuItem>
                                        <MenuItem value="Active">Active</MenuItem >
                                        <MenuItem value="InActive">InActive</MenuItem >

                                    </TextField>
                                </div>

                            </div>


                            {dueDate === "Date" && <div className='col d-flex justify-content-end mb-2 g-2'>
                                <div className="me-2 ">
                                    <DatePicker
                                      
                                        fullWidth
                                        id="startDateId"
                                        name="dueStartDate"
                                        onChange={(newValue) => dueDatePicker(newValue, "dueStartDate")}
                                        label="Start Date"

                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />
                                </div>
                                <div className="me-2">
                                    <DatePicker
                                       
                                        fullWidth
                                        id="endDateId"
                                        name="dueEndDate"
                                        onChange={(newValue) => dueDatePicker(newValue, "dueEndDate")}
                                        label="End Date "

                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />
                                </div>
                                <div>
                                    <Button variant='contained' startIcon={<FilterAlt />} color='warning'>Filter</Button>
                                    </div>
                            </div>}
                        </div>
                        <div>
                            <Box sx={{ height: 400, width: '100%', my: 2 }}>
                                <DataGrid

                                    rows={filteredItemListData}
                                    columns={columns}
                                    getRowId={(row) => row._id}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                    }}
                                    sx={{
                                        ".MuiTablePagination-displayedRows": {

                                            "margin-top": "1em",
                                            "margin-bottom": "1em"
                                        }
                                    }}
                                    slots={{
                                        toolbar: GridToolbar,
                                      }}

                                    density="compact"
                                    //disableColumnMenu={true}
                                    //clipboardCopyCellDelimiter={true}
                                    checkboxSelection
                                    onRowClick={handleRowClick}
                                    pageSizeOptions={[5]}
                                />
                            </Box>

                        </div>
                        <div className='row'>
                            <div className=' col d-flex '>
                                <div className='me-2' >
                                    <button type="button" className='btn btn' >History Card</button>
                                </div>
                                <div className='me-2' >
                                    <button type="button" className='btn btn-' >Change status</button>
                                </div>
                                <div className='me-2' >
                                    <button type="button" className='btn btn-' >Item Master</button>
                                </div>
                            </div>
                            <div className=' col d-flex justify-content-end'>
                                <div className='me-2'>
                                    <button type="button" className='btn btn-warning' >+ Add Vendor</button>
                                </div>
                                <div className='me-2'>
                                    <Button component={Link} to={`/itemedit/${itemId}`} variant="contained" color="warning">Modify</Button>
                                </div>
                                <div className='me-2'>
                                    <button type="button" className='btn btn-danger' >Delete</button>
                                </div>
                                <div className='me-2'>
                                    <button type="button" className='btn btn-secondary' >Back</button>
                                </div>


                            </div>

                        </div>
                        <div className='row'>
                            <div className='col d-flex '>
                                <div className='me-2' >
                                    <label className='itemlistloade'>
                                        <input className="form-control itemlistdownload" type="file" id="upload" />Upload</label>
                                </div>
                                <div className='me-2'>
                                    <label className='itemlistloade'>
                                        <input className="form-control itemlistdownload" type="file" id="download" />Download </label>
                                </div>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Print</button>
                                </div>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Sticker Print</button>
                                </div>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Sticker Print Barcode</button>
                                </div>

                            </div>




                        </div>




                    </Paper>

                </LocalizationProvider>
            </form>

        </div>
    )
}

export default ItemList