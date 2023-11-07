const mongoose = require('mongoose');
const dbUrl = "mongodb+srv://nkamar1412:Amar9669@cluster0.xnnoefu.mongodb.net/";

const MongoDb = mongoose.connect(dbUrl).then(()=>{
    console.log(`databse is connected`);
}).catch((err)=>{
    console.log(err);
})

module.exports = MongoDb;