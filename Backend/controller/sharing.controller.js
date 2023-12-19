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

        if (sharing === null) {
            return res.status(404).json({ message: "sharing was not found" });
        }

        if (sharing.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "You are not authorized" });
        }
        return res.status(200).json({ message: "sharing deleted successfully", deletedListing: sharing });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        next(error);
    }
};


// Export the method
module.exports = { createSharing , deleteSharing};
