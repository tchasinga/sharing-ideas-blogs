const express = require('express');
const router = express.Router();

const { deleteUser, updateUser , getUserSharing,getUserConctact } = require('../controller/user.controller.js');

router.delete('/delete/:id', deleteUser);
router.post('/update/:id', updateUser);
router.get('/getsharing/:id', getUserSharing);
router.get('/:id', getUserConctact);


module.exports = router;