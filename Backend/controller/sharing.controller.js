const Sharing = require("../models/sharinglist.model.js");

// Create Sharing model in the database
const createSharing = async (req, res, next) => {
    try{
        const sharing = await Sharing.create(req.body);
        res.status(201).json({
            success: true,
            data: sharing,
            message : "Create Sharing successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create sharing table"
        });
    }
};

// Export the method
module.exports = { createSharing };
