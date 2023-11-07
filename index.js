const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const MongoConnect = require('./database/db');


const adminRouter = require('./router/admin');
const shopRouter = require('./router/shop');
const orderRouter = require('./router/oders');

app.get('/', (req, res)=>{
    res.send(`hello from the server `);
})

app.use(express.json());
app.use(express.urlencoded({express:true}));
// app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use('/admin', adminRouter);
app.use('/shop', shopRouter);
app.use('/orders', orderRouter);


    app.listen(3000, ()=>{
        console.log(`server is running on port 3000`);
    })
