const mongoose = require('mongoose');
const dbUrl = "mydb";

const MongoDb = mongoose.connect(dbUrl).then(()=>{
    console.log(`databse is connected`);
}).catch((err)=>{
    console.log(err);
})

module.exports = MongoDb;
