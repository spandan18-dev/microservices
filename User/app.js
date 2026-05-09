const express = require ('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectdb = require('./Db/db');

connectdb();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const userRouter = require('./Routes/user.route');
app.use('/api',userRouter);

module.exports = app;