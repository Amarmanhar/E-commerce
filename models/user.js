const mongoose = require('mongoose');


const user = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true, 
      },
      cart: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
});

  
const User = mongoose.model('users', user);

// const newUser = new User({
//     name: 'amar manhar',
//     email: 'amr123@gmail.com',
//   });
  
//   newUser.save()
//     .then((user) => {
//       console.log('User saved:');
//     })
//     .catch((error) => {
//       console.error('Error saving user:', error);
//     });

module.exports = User;