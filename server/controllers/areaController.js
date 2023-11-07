const areaModel = require("../models/areaModel")

const areaController = {
    getAllAreas: async (req, res) => {
        try {
          const areaResult = await areaModel.find();
          res.status(202).json({ result: areaResult, status: 1 , message: "Area Get Successfull"});
          //res.status(200).json(employees);
        } catch (err) {
          console.error(err);
          res.status(500).send('Error on Area');
        }
      },
      createArea: async (req, res) => {
       
        try {
          const { area,areaStatus} = req.body;
          const areaResult = new areaModel({ area,areaStatus});
          const validationError = areaResult.validateSync();

          if (validationError) {
            // Handle validation errors
            const validationErrors = {};
    
            if (validationError.errors) {
              // Convert Mongoose validation error details to a more user-friendly format
              for (const key in validationError.errors) {
                validationErrors[key] = validationError.errors[key].message;
              }
            }
    
            return res.status(400).json({
              errors: validationErrors
            });
          }
          console.log("success")
    
                await areaResult.save();
                return res.status(200).json({ message: "Area Successfully Saved", status: 1 });
            } catch (error) {
                console.log(error)
                if (error.errors) {
                    const errors500 = {};
                    for (const key in error.errors) {
                        errors500[key] = error.errors[key].message;
                    }
                    return res.status(500).json({ error: errors500, status: 0 });
                }
    
                return res.status(500).json({ error: 'Internal server error on Area', status: 0 });
            }
        },
         
      updateArea: async (req, res) => {
        try {
          const areaId = req.params.id; // Assuming desId is part of the URL parameter
          // if (isNaN(desId)) {
          //   return res.status(400).json({ error: 'Invalid desId value' });
          // }
      
          // Create an object with the fields you want to update
          const updateAreaFields = {
            /* Specify the fields and their updated values here */
             area : req.body.area, areaStatus: req.body.areaStatus// Example: updating the 'name' field
            // Add more fields as needed
          };
      
          // Find the designation by desId and update it
          const areaUpdate = new areaModel(updateAreaFields);

          const validationError = areaUpdate.validateSync();
          if (validationError) {
            // Handle validation errors
            const validationErrors = {};
    
            if (validationError.errors) {
              // Convert Mongoose validation error details to a more user-friendly format
              for (const key in validationError.errors) {
                validationErrors[key] = validationError.errors[key].message;
              }
            }
    
            return res.status(400).json({
              errors: validationErrors
            });
          }

          // Find the designation by desId and update it
          const updateArea = await areaModel.findOneAndUpdate(
              { _id: areaId },
              updateAreaFields,
              { new: true } // To return the updated document
          );

          if (!updateArea) {
              return res.status(404).json({ error: 'Area not found' });
          }
          console.log("Area Updated Successfully")
          res.status(200).json({ result: updateArea, message: "Area Updated Successfully" });
      } catch (error) {
          console.log(error);
          if (error.code === 11000) {
              return res.status(500).json({ error: 'Duplicate Value Not Accepted' });
          }
          const errors500 = {};
          for (const key in error.errors) {
              errors500[key] = error.errors[key].message;
          }
          res.status(500).json({ error: error, status: 0 });
      }
  },
  deleteArea: async (req, res) => {
    try {
        const areaId = req.params.id; // Assuming id is part of the URL parameter

        // Find the designation by _id and remove it
        const deleteArea = await areaModel.findOneAndRemove(
            { _id: areaId } // Pass the _id as an object
        );

        if (!deleteArea) {
            return res.status(404).json({ error: 'Area not found' });
        }

        res.status(202).json({ message: 'Area detail deleted successfully' ,result: deleteArea });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
}
}


module.exports = areaController;