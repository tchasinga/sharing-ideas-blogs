const Sharing = require("../models/sharinglist.model.js");

// Create Sharing model in the database
const createSharing = async (req, res, next) => {
  try {
    const sharing = await Sharing.create(req.body);
    res.status(201).json({
      success: true,
      data: sharing,
      message: "Create Sharing successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create sharing table",
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
    return res
      .status(200)
      .json({ message: "sharing deleted successfully", sharing });
  } catch (error) {
    next(error);
  }
};

// Adding Public get API for all  user (it will be used in the frontend specially in page details.. by id )
const getSharingIdesList = async (req, res, next) => {
  try {
    const sharingthingsget = await Sharing.findById(req.params.id);
    return res.status(200).json(sharingthingsget);
  } catch (error) {
    next(error);
  }
};

// Adding an API Update sharing table (the user will  have an access to update his sharing table which was only created by him)
const updateSharing = async (req, res, next) => {
  try {
    const sharingTableUpdated = await Sharing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json(sharingTableUpdated);
  } catch (error) {
    next(error);
  }
};

// Public GET request for all USER to SEARCH AND FILTER DATA FROM API PUBLIC
const getAlldataFromSharingList = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let publicrole = req.query.publicrole;
    if (publicrole === undefined || publicrole === "all") {
      publicrole = { $exists: true };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "dateinsert";
    const order = req.query.order || "desc";

    const sharedData = await Sharing.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { publicrole: { $regex: searchTerm, $options: "i" } },
      ],
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex)
      .exec();

    return res.status(200).json(sharedData);
  } catch (error) {
    next(error);
  }
};


// Export the method
module.exports = {
  createSharing,
  deleteSharing,
  getSharingIdesList,
  updateSharing,
  getAlldataFromSharingList,
};
