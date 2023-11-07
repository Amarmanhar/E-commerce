const moongose = require('mongoose');

const productSchema = new  moongose.Schema({
    name: {
        type: String,
        required: true,
    },
    imagesUrls: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    userId: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model
        required: true,
      },
})

const Product = moongose.model('products', productSchema);

module.exports= Product;

