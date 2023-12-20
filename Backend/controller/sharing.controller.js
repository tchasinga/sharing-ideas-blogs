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


// Delete sharing Ideas which was already created by the user
const deleteSharing = async (req, res, next) => {
    try {
        const sharing = await Sharing.findByIdAndDelete(req.params.id);
        if (!sharing) {
            return res.status(404).send("Listing not found");
        }
        return res.status(200).json({ message: "sharing deleted successfully",sharing});
    } catch (error) {
        next(error);
    }
};

// Adding Public get API for all  user (it will be used in the frontend specially in page details.. by id )
const getSharingIdesList = async (req, res, next) => {
    try {
        const sharing = await Sharing.findById(req.params.id);
        return res.status(200).json({ message: "sharing get successfully",sharing});
    } catch (error) {
        next(error);
    }
};


// Export the method
module.exports = { createSharing , deleteSharing , getSharingIdesList};
