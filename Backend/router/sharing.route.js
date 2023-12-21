const express = require('express');
const router = express.Router();
const {createSharing , deleteSharing, getSharingIdesList , updateSharing} = require("../controller/sharing.controller.js");

// Create a rom of API
router.post("/creatignsharingideas", createSharing);
router.delete("/deleteideas/:id", deleteSharing);
router.get("/getsharingideas/:id", getSharingIdesList);
router.post("/updatesharingideas/:id", updateSharing);
// Export the router
module.exports = router;