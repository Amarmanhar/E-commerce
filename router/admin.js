const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin');
const userAuth = require('../middleware/auth');

router.post('/add-product', userAuth.FindUser,adminController.AddProduct );
router.get('/get-products', adminController.getProducts);
router.get('/get-product/:productId', adminController.get_product );
router.put('/update-product/:productId', adminController.editProduct );
router.delete('/delete-product/:productId',adminController.deleteProduct);

module.exports = router;