const express = require('express');
const router = express.Router();
const {createSharing , deleteSharing} = require("../controller/sharing.controller.js");

// Create a rom of API
router.post("/creatignsharingideas", createSharing);
router.delete("/deleteideas/:id", deleteSharing);
// Export the router
module.exports = router;