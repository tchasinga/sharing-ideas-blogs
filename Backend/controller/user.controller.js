const User = require('../models/user.model.js');

// Delete user from database system...
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token")
        res.status(200).json({message: "User deleted successfully!"});
    } catch (error) {
        next(error);
    }
}


// Module expeort from the database system...
module.exports = { deleteUser } 