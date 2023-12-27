import React from "react";
import { Container, TextField, MenuItem, Paper, Button } from "@mui/material";
import { AdapterDayjs, } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import axios from 'axios';
import dayjs from 'dayjs';


  
function Instrument_History_Card() {
    const [itemList, setItemList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filteredIMTEs, setFilteredIMTEs] = useState([])
    const [distCalName,setDistCalName] = useState([]);
    const [calDetails,setCalDetails] = useState({
        calInsName : "",
        calInsIMTENo: "",
    });
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_PORT}/itemCal/getAllItemCals`
            );
            console.log(response.data); // Handle the response data as needed
            setItemList(response.data.result)
            setFilteredData(response.data.result)

            const instrumentName = []
            const filterData = response.data.result.filter(item => {
                if (item.calItemName !=="" && !instrumentName.includes(item.calItemName)) {
                    instrumentName.push(item.calItemName);
                    return true;
                }
                return false;
            });
            setDistCalName(instrumentName);
            console.log(instrumentName, "hi")


          } catch (error) {
            console.error('Error fetching data:', error);
          }
        
        };
      
        fetchData(); // Call the function to fetch data when the component mounts
      }, []);

      
      const handleSelectionModelChange = (selectionModel) => {
        // Get the selected row data based on the selection model
        const selectedRows = selectionModel.map((selectedId) =>
            filteredData.find((row) => row._id === selectedId)
        );
        setSelectedRow(selectedRows[0]); // Assuming single row selection, adjust if needed
        console.log("Selected Row: ", selectedRows[0]);
    };

     const handleCalDetails = (e) => {
        const {name, value} = e.target;
        
        if(name === "calInsName"){
            const imte = itemList.filter((item)=> item.calItemName === value)
            setFilteredIMTEs(imte)
        }
        setCalDetails((prev) => ({...prev, [name]: value}))
     }
      

    
  const columns = [
    { field: '_id', headerName: 'SlNo', width: 50, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1  },
    { field: 'calItemCalDate', headerName: 'Calibration Date', width: 150, valueGetter: (params) => dayjs(params.row.calItemCalDate).format('DD-MM-YYYY') },
    { field: 'col3', headerName: 'Calibration Status', width: 150 },
    { field: 'calItemDueDate', headerName: 'Next calibration Date', width: 150, valueGetter: (params) => dayjs(params.row.calItemDueDate).format('DD-MM-YYYY') },
    { field: 'col5', headerName: 'Certificate Status', width: 150 },
    { field: 'calCertificateNo', headerName: 'Certificate No', width: 150 },
    { field: 'col7', headerName: 'Observed Size 1', width: 150 },
    { field: 'calUpdatedAt', headerName: 'Calibrated At', width: 150 },
  ];

  


    
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>

                    <Container maxWidth sx={{ mb: 2, mt: 2 }}>
                        <h1 className="text-center">Instrument History Card</h1>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1
                            }}
                            elevation={12}
                        >
                            <div container spacing={2} className="row g-2">
                                <div className="col-3">
                                    <TextField label="Instrument Name" size="small" onChange={handleCalDetails} select name="calInsName" value={calDetails.calInsName} fullWidth >
                                        <MenuItem value="all">All</MenuItem >
                                        {distCalName.map((cal)=> (
                                            <MenuItem value={cal}>{cal}</MenuItem >
                                        ))}
                                        
                                    </TextField>
                                </div>
                                <div className="col-2">
                                    <TextField label="IMTE No" size="small"  select  onChange={handleCalDetails} name="calInsIMTENo" value={calDetails.calInsIMTENo} fullWidth >
                                        <MenuItem value="all">All</MenuItem >
                                        {filteredIMTEs.map((cal)=> (
                                        <MenuItem value={cal.calIMTENo}>{cal.calIMTENo}</MenuItem >
                                        )
                                        )}
                                    </TextField>
                                </div>

                                <div className="col-2 offset-3">
                                    <DatePicker
                                        fullWidth
                                        id="fromDateId"
                                        name="fromDate"
                                        label="From Date"
                                        sx={{ width: "100%" }}
                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />
                                </div>
                                <div className="col-2">
                                    <DatePicker
                                        fullWidth
                                        id="toDateId"
                                        name="toDate"
                                        sx={{ width: "100%" }}
                                        label="To Date"
                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />
                                </div>

                                <div className="row">
                                    <div className=" col-md-3  g-2 mb-3 d-flex justify-content-start">
                                        <div ><Button>Report</Button></div>
                                        <div ><Button>Excel</Button></div>
                                        <div ><Button>Close</Button></div>
                                    </div>
                                    <div className="col"></div>
                                    <div className="col-md-8  g-2 d-flex justify-content-between">
                                        <div ><Button>View Certificates</Button></div>
                                        <div ><Button>View Instructions</Button></div>
                                        <div ><Button>View Drawing</Button></div>
                                        <div ><Button>View R&R</Button></div>
                                        <div ><Button>View Attachment</Button></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <table className="table table-bordered text-center align-middle">
                                        <thead>
                                            <tr>
                                                <th>Serial No</th>
                                                <th>Model No</th>
                                                <th>Range / Size</th>
                                                <th>Calibration Source</th>
                                                <th>Premissible Size</th>
                                                <th>Location</th>
                                                <th>Frequency In Months</th>
                                                <th>Make</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                    {selectedRow && (
                                        <tr key={selectedRow._id}>
                                            <td>1</td>
                                            <td>{selectedRow.modelNo}</td>
                                            <td>{selectedRow.calRangeSize}</td>
                                            <td>{selectedRow.calibrationSource}</td>
                                            <td>{selectedRow.premissibleSize}</td>
                                            <td>{selectedRow.location}</td>
                                            <td>{selectedRow.frequencyInMonths}</td>
                                            <td>{selectedRow.make}</td>
                                        </tr>
                                    )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Paper>
                        <Paper>
                            <DataGrid
                                rows={filteredData}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                getRowId={(row)=> row._id}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                                onSelectionModelChange={(selectionModel) =>
                                  handleSelectionModelChange(selectionModel)
                                } 
                            />
                        </Paper>
                    </Container>
                </form>
            </LocalizationProvider>
        </div>);
}

export default Instrument_History_Card;