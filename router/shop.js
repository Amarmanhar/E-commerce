const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/auth');
const shopController = require('../controller/shop')

router.post('/add-to-cart/:productId' , userAuth.FindUser, shopController.AddToCart );
router.get('/get-cartProducts',userAuth.FindUser, shopController.getCartProducts);
router.put('/update-quantity/:productId', userAuth.FindUser, shopController.UpdateQuantity);
router.delete('/remove-from-cart/:productId', userAuth.FindUser, shopController.RemoveFromCart);
router.post('/place-order', userAuth.FindUser, shopController.placeOrder);


module.exports = router;