const User = require("../models/user.model.js");
const bycrypt = require("bcrypt");
const Sharing = require("../models/sharinglist.model.js");

// Delete user from database system...
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

// Update all user from database and return the updated user...
const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = bycrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id }, // Specify the query criteria
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({ message: "User updated successfully", user: rest });
  } catch (error) {
    next(error);
  }
};

// Get user listing of data created by the user with his specified id... (this will display in the profile pages of user)
const getUserSharing = async (req, res, next) => {
  try {
    const sharingmyides = await Sharing.find({ userRef: req.params.id });
    res.status(200).json(sharingmyides);
  } catch (error) {
    // Handle errors
    next(error);
  }
};


// Get a user CONTACT information (WHEN USER WANNA COMMUNICATE WITH OWNER)
const getUserConctact = async (req, res, next) =>{
  // TODO
try {
  let  user = await User.findById(req.params.id);
  const {password : pass, ...rest} = user._doc;
  res.status(200).json(rest);
} catch (error) {
  next(error);
}
}


// Module expeort from the database system...
module.exports = { deleteUser, updateUser, getUserSharing , getUserConctact};
