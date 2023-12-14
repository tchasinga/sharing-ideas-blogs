const express = require('express');
const router = express.Router();

const { deleteUser } = require('../controller/user.controller.js');

router.delete('/delete/:id', deleteUser);


module.exports = router;