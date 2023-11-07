const Orders = require('../models/order');
const Products = require('../models/product');

exports.getOrders = async(req, res) =>{

    try {
        const orders = await Orders.find().populate('userId', 'name email').exec();

        const productDetails = [];
        for (const order of orders) { 
            for (const item of order.items) {
                const product = await Products.findById(item.productId);
                productDetails.push({
                    name: product.name,
                    price: product.price,
                    quantity: item.quantity,
                });
            }
            
        }
        res.status(200).json(productDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

}