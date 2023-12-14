const express = require('express');
const {signup, signin ,singout} = require('../controller/auth.controller.js')
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', singout);

module.exports = router;