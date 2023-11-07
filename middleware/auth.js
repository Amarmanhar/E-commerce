const User = require('../models/user');

exports.FindUser = async(req, res, next) =>{
    
    const userId = '65265f07ae4d9ea29e3bb90e'; 
  try {
    const user = await User.findById(userId);
    if (user) {
      req.user = user;
      console.log('Found user: ', req.user._id);
    } else {
      console.log('User not found.');
    }
    next();
  } catch (error) {
    console.error('Error finding user:', error);
    next(error);
  }
}