const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/auth');
const orderContoller = require('../controller/order');

router.get('/get-orders', userAuth.FindUser, orderContoller.getOrders );
module.exports = router;