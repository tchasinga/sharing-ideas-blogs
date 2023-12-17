const express = require('express');
const router = express.Router();
const {createSharing} = require("../controller/sharing.controller.js");

// Create a rom of API
router.post("/sharingideas", createSharing);

// Export the router
module.exports = router;