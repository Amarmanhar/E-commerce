const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
      },

      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
          },
          quantity: {
            type: Number,
          }
        }
      ]
});

const Orders = mongoose.model('orders', orderSchema);
module.exports = Orders;