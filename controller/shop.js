const User = require('../models/user');
const Product = require('../models/product');
const Oders = require('../models/order');

exports.AddToCart = async(req, res)=>{
  
    const userId = req.user._id; 
    const  productId  = req.params.productId;
    console.log("product id is " + productId);
 try{
    
    const updatedUser = await User.findOneAndUpdate(
        { _id: userId, 'cart.productId': productId },
        { $inc: { 'cart.$.quantity': 1 } },
        { new: true }
      );

      if (!updatedUser) {
        await User.findByIdAndUpdate(
          userId,
          { $push: { cart: { productId, quantity: 1 } } },
          { new: true }
        );
      }

    res.status(200).json({ message: 'Product added to cart successfully' });

 }catch(err){
    console.log(err);
 }

}

exports.getCartProducts = async(req, res)=>{

    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (user) {
          const cartProducts = [];
          for (const item of user.cart) {
           // console.log("items are "+item);
            const product = await Product.findById(item.productId);
           console.log('products is '+product)
            if (product) {
              const productDetails = {
                _id:product._id,
                name: product.name,
                price: product.price,
                images: product.imagesUrls,
                quantity: item.quantity
              };
              cartProducts.push(productDetails);
            }
          }
          
          res.status(200).json(cartProducts);
        } else {
          res.status(404).json({ message: 'User not found.' });
        }
      } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
}

exports.UpdateQuantity = async(req, res)=>{
   
    const userId = req.user._id;
    const  productId  = req.params.productId;
    const { quantity } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, 'cart.productId': productId },
      { $set: { 'cart.$.quantity': quantity } },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({ message: 'Product quantity updated successfully' });
    } else {
      res.status(404).json({ message: 'User or product not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }

}

exports.RemoveFromCart = async (req, res) => {

    const userId = req.user._id;
    const { productId } = req.params;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { cart: { productId } } },
        { new: true }
      );

      if (updatedUser) {
        res.status(200).json({ message: 'Product removed from cart successfully' });
      } else {
        res.status(404).json({ message: 'User or product not found' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.placeOrder= async(req, res)=>{

    try{

      const userId = req.user._id;
      const user = await User.findById(userId);
      const orerItems = user.cart.map(item =>({
        productId: item.productId,
        quantity : item.quantity
      }));

      await Oders.create({
        userId:userId,
        items: orerItems
      });

      await User.findByIdAndUpdate(userId, {$set: {cart: []}});
      res.status(200).json('order placed sucessfully ');

    }catch(err){
      console.log(err);
    }

  }

  
  
  
  
  