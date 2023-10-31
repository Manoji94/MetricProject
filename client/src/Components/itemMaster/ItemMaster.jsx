import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from '@mui/material/Stack';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const ItemMaster = () => {

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,

    });

    const [itemMasterStateId, setItemMasterStateId] = useState("")
    const initialItemMasterData = {
        itemType: "",
        itemDescription: "",
        itemPrefix: "",
        itemFqInMonths: "",
        calAlertInDay: "",
        wiNo: "",
        uncertainty: "",
        uncertaintyUnit: "",
        standardRef: "",
        itemImageName: "",
        workInsName: "",
        status: "",
        calibrationPoints: [],


    }

    const [itemMasterData, setItemMasterData] = useState({
        itemType: "",
        itemDescription: "",
        itemPrefix: "",
        itemFqInMonths: "",
        calAlertInDay: "",
        wiNo: "",
        uncertainty: "",
        uncertaintyUnit: "",
        standardRef: "",
        itemImageName: "",
        workInsName: "",
        status: "",
        calibrationPoints: [],

    })

    console.log(itemMasterData)

    const addCalibrationPointRow = () => {
        setItemMasterData((prevItemMasterData) => ({
            ...prevItemMasterData,
            calibrationPoints: [...prevItemMasterData.calibrationPoints, { calibrationPoint: "" }]
        }))
    }
    const deleteCalibrationPointRow = (index) => {
        setItemMasterData((prevItemMasterData) => {
            const updateCP = [...prevItemMasterData.calibrationPoints]
            updateCP.splice(index, 1);
            return {
                ...prevItemMasterData, calibrationPoints: updateCP,
            };
        })
    };

    const changeCalibrationPointRow = (index, name, value) => {
        setItemMasterData((prevItemMasterData) => {
            const updateCP = [...prevItemMasterData.calibrationPoints]
            updateCP[index] = {
                ...updateCP[index], [name]: value,
            };
            return {
                ...prevItemMasterData, calibrationPoints: updateCP,
            };
        })
    };

    const [itemMasterDataList, setItemMasterDataList] = useState([])
    const itemMasterFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemMaster/getAllItemMasters`
            );
            console.log(response.data)
            setItemMasterDataList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemMasterFetchData();
    }, []);
    console.log(itemMasterDataList)

    const itemMesterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemMaster/createItemMaster`, itemMasterData
            );
            {/*console.log(response.data.message)*/ }
            console.log(response)
            itemMasterFetchData();

            setItemMasterData(initialItemMasterData);
        } catch (err) {
            console.log(err);
            alert(err);
        }
    };

    const updateItemMasterData = async (id) => {
        try {
            await axios.put(
                "http://localhost:3001/itemMaster/updateItemMaster/" + id, itemMasterData
            );
            itemMasterFetchData();
            setItemMasterStateId(null)
            setItemMasterData(initialItemMasterData);
            console.log("ItemMaster Updated Successfully");
        } catch (err) {
            console.log(err);
        }
    };
    const deleteItemMasterData = async (id) => {
        try {
            await axios.delete(
                "http://localhost:3001/ItemMaster/deleteItemMaster/" + id, itemMasterData
            );
            itemMasterFetchData();
            setItemMasterData(initialItemMasterData);
            console.log("ItemMaster delete Successfully");
        } catch (err) {
            console.log(err);
        }
    };


    const updateItemMaster = async (item) => {
        setItemMasterData(item)
        setItemMasterStateId(item._id)
    }

    const handleItemMasterBaseChange = (e) => {
        const { name, value } = e.target;
        setItemMasterData((prev) => ({ ...prev, [name]: value }));

    };

    const bodyItem = {
        borderRadius: "10px",

        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 25px 10px",
    }
    return (
        <div className='container'>
            <div style={bodyItem}>
                <form>
                    <h1 className='text-center'>Item Master Database</h1>
                    <div className='row mb-2 g-2'>
                        <div class="form-floating col">
                            <select className="form-select" id="itemTypeId" name="itemType" value={itemMasterData.itemType} onChange={handleItemMasterBaseChange} >
                                <option selected>Item Type</option>
                                <option value="1">Attribute</option>
                                <option value="2">Variable</option>
                                <option value="2">Reference Standard</option>

                            </select>
                            <label htmlFor="itemTypeId">Item Type</label>
                        </div>
                        <div className="form-floating col">
                            <input type="text" className="form-control" id="itemDescriptionId" name="itemDescription" placeholder="itemDescription" value={itemMasterData.itemDescription} onChange={handleItemMasterBaseChange} />
                            <label htmlFor="itemDescriptionId">Item Description</label>
                        </div>

                        <div className="form-floating col">
                            <input type="text" className="form-control" id="itemPrefixId" name="itemPrefix" placeholder="itemPrefix" value={itemMasterData.itemPrefix} onChange={handleItemMasterBaseChange} />
                            <label htmlFor="itemPrefixId">Item Prefix</label>
                        </div>
                    </div>

                    <div className='row '>
                        <div className='col-md-7'>
                            <div className='row mb-2 g-2'>
                                <div className="form-floating col-md-7">
                                    <input type="text" className="form-control" id="wiNoId" name="wiNo" placeholder="wiNo" value={itemMasterData.wiNo} onChange={handleItemMasterBaseChange} />
                                    <label htmlFor="wiNoId">WI No</label>
                                </div>
                                <div className="form-floating col">
                                    <input type="number" className="form-control" id="itemFqInMonthsId" name="itemFqInMonths" placeholder="itemFqInMonths" value={itemMasterData.itemFqInMonths} onChange={handleItemMasterBaseChange} />
                                    <label htmlFor="itemFqInMonthsId">Item Fq In Months</label>
                                </div>

                            </div>
                            <div className='row mb-2 g-2'>
                                <div className="input-group col">
                                    <div className="form-floating">
                                        <input type="number" className="form-control" id="uncertaintyId" name="uncertainty" placeholder="Uncertainty" value={itemMasterData.uncertainty} onChange={handleItemMasterBaseChange} />
                                        <label htmlFor="uncertaintyId">Uncertainty</label>
                                    </div>
                                    <div className="form-floating">
                                        <select className="form-select" id="uncertaintyUnitId" name="uncertaintyUnit" value={itemMasterData.uncertaintyUnit} onChange={handleItemMasterBaseChange} >
                                            <option selected>Unit</option>
                                            <option value="1">Unit Name</option>
                                        </select>
                                        <label htmlFor="uncertaintyUnitId">Unit</label>
                                    </div>

                                </div>
                                <div className="form-floating col">
                                    <input type="number" className="form-control" id="calAlertInDayId" name="calAlertInDay" placeholder="calAlertInDay" value={itemMasterData.calAlertInDay} onChange={handleItemMasterBaseChange} />
                                    <label htmlFor="calAlertInDayId">Calibration Alert In Days</label>
                                </div>
                            </div>
                            <div className='row g-2 mb-2 '>

                                <div className="form-floating col">
                                    <input type="text" className="form-control" id="standardRefId" name="standardRef" placeholder="standardRef" value={itemMasterData.standardRef} onChange={handleItemMasterBaseChange} />
                                    <label htmlFor="standardRefId">Standard Ref </label>
                                </div>
                                <div className="form-floating col">
                                    <select className="form-select" id="statusId" name="status" aria-label="Floating label select example" value={itemMasterData.status} onChange={handleItemMasterBaseChange} >
                                        <option selected>Status</option>
                                        <option value="Active">Active</option>
                                        <option value="InActive">InActive</option>
                                        <option value="Relived">Relived</option>
                                    </select>
                                    <label htmlFor="statusId">Status</label>
                                </div>

                            </div>
                        </div>
                        <div className='col-md-2'>
                            <div style={{ border: "1px solid", width: "100%", height: "72%", margin: "0 0px 0 0", padding: 0 }}>
                                <image src="" />
                            </div>
                            <button className='btn btn-warning mt-2 '>Upload Image</button>                    </div>
                        <div className='col-md-3 d-flex justify-content-end mb-2 ps-0 ms-0'>
                            <div className='col-12'>
                                <table className='table table-bordered text-center align-middle'>
                                    <tbody>
                                        <tr>
                                            <th>Si No</th>
                                            <th>Calibration Points </th>
                                            <th><button type='button' className='btn btn-warning' onClick={addCalibrationPointRow}>Add</button></th>
                                        </tr>
                                        {itemMasterData.calibrationPoints ? itemMasterData.calibrationPoints.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><input type='text' className='form-control' name='calibrationPoint' value={item.calibrationPoint} onChange={(e) => changeCalibrationPointRow(index, e.target.name, e.target.value)} /></td>
                                                <td><button type='button' className='btn btn-danger' onClick={() => deleteCalibrationPointRow(index)}><i class="bi bi-trash-fill"></i></button></td>
                                            </tr>


                                        )) : <tr></tr>}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-7">
                            <div>
                                <Stack direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={2} >
                                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} size="small" font>
                                        Upload file
                                        <VisuallyHiddenInput type="file" />
                                    </Button>
                                    <Button component="label" variant="contained" startIcon={<FileDownloadIcon />} size="small">
                                        Download file
                                        <VisuallyHiddenInput type="file" />
                                    </Button>
                                </Stack>
                            </div>



                            <div className=' md-7'>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="flex-start"
                                    spacing={2}

                                >
                                    <Button component="label" variant="contained" startIcon={<UploadFileIcon />} size="small">
                                        Work Instruction Upload
                                        <VisuallyHiddenInput type="file" />
                                    </Button>
                                </Stack>
                            </div>


                        </div>


                        <div className="col-md-5">
                            {itemMasterStateId ?
                                <div className='col d-flex justify-content-end '>
                                    <div className='me-2' >
                                        <button type="button" className='btn btn-secondary' onClick={() => updateItemMasterData(itemMasterStateId)} >Modify</button>
                                    </div>
                                    <div className='me-2' >
                                        <button type="button" className='btn btn-secondary' onClick={() => { setItemMasterStateId(null); setItemMasterData(initialItemMasterData) }}>Cancel</button>
                                    </div>
                                </div> : <div className='col d-flex justify-content-end '>
                                    <div >
                                        <button type="button" className='btn btn-warning' onClick={itemMesterSubmit}>+ Add Item Master</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>




                    <hr />

                    <div>
                        <h3 className='text-center'>Vendor List</h3>
                        <div className='row mb-2 g-2'>

                            <div class="form-floating col-3 ">
                                <select className="form-select" id="itemTypeSortId" name="itemTypeSort" aria-label="Floating label select example" onChange={handleItemMasterBaseChange}>
                                    <option selected>Item Type</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <label htmlFor="itemTypeSortId">Item Type Sort</label>
                            </div>
                            <div class="form-floating col-3">
                                <select className="form-select" id="itemDescriptionSortId" name="itemDescriptionSort" aria-label="Floating label select example" onChange={handleItemMasterBaseChange} >
                                    <option selected>Item Description</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <label htmlFor="itemDescriptionSortId">Item Description Sort</label>
                            </div>

                        </div>
                        <div>
                            <table className='table table-bordered text-center'>
                                <tbody>
                                    <tr>
                                        <th>Si No</th>
                                        <th>Item Name</th>
                                        <th>Item Prefix</th>
                                        <th>Cal Fq</th>
                                        <th>Alert Days</th>
                                        <th>Item Type</th>
                                        <th>Status</th>
                                        <th>Delete</th>


                                    </tr>
                                    {itemMasterDataList ? itemMasterDataList.map((item, index) => (
                                        <tr key={index} onClick={() => updateItemMaster(item)}>
                                            <td>{index + 1}</td>
                                            <td>{item.itemDescription}</td>
                                            <td>{item.itemPrefix}</td>
                                            <td>{item.itemFqInMonths}</td>
                                            <td>{item.calAlertInDay}</td>
                                            <td>{item.itemType}</td>
                                            <td>{item.status}</td>


                                            <td><button type='button' className='btn btn-danger' onClick={() => deleteItemMasterData(item._id)} ><i class="bi bi-trash-fill"></i></button></td>
                                        </tr>
                                    )) : <tr>
                                        <td colSpan={8}>No Data Available</td></tr>}

                                </tbody>
                            </table>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ItemMaster