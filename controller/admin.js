
const Product = require('../models/product');


exports.AddProduct = async(req, res)=>{

    console.log("products are  "+req.body);
   
    try{
        
        const newProduct = new Product({
            name: req.body.name,
            imagesUrls: req.body.imagesUrls,
            price: req.body.price,
            details: req.body.details,
            userId: req.user._id
        });

        
        const response = await newProduct.save();
    
        res.status(200).json({message: 'Product added sucessfully'});

    }catch(err){
        console.log(err);
    }
}

exports.getProducts = async( req, res)=>{

    try {
        
        const products = await Product.find();
        //console.log(products);
        res.status(200).json(products);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching products.' });
    }

}

exports.get_product = async(req, res)=>{

    const productId = req.params.productId;
    try{
        const product = await Product.findById(productId);
        res.status(200).json(product);
    }catch(err){
        console.log(err);
    }
}

exports.editProduct =async(req, res)=>{

    const productId = req.params.productId;

    try {
        // Find the product by its ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = req.body.name;
        product.imagesUrls = req.body.imagesUrls;
        product.price = req.body.price;
        product.details = req.body.details;

        await product.save();
        res.status(200).json( 'Product updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.deleteProduct  = async(req, res)=>{
    const productId = req.params.productId;

    try {
        
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json( 'Product deleted successfully' );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}