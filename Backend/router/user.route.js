const express = require('express');
const router = express.Router();

const { deleteUser, updateUser } = require('../controller/user.controller.js');

router.delete('/delete/:id', deleteUser);
router.post('/update/:id', updateUser);


module.exports = router;