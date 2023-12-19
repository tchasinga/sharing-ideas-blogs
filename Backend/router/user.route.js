const express = require('express');
const router = express.Router();

const { deleteUser, updateUser , getUserSharing} = require('../controller/user.controller.js');

router.delete('/delete/:id', deleteUser);
router.post('/update/:id', updateUser);
router.get('/getsharing/:id', getUserSharing);


module.exports = router;