const express = require ('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectdb = require('./Db/db');
const cookieParser = require('cookie-parser');

connectdb();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const userRouter = require('./Routes/user.route');
app.use('/api',userRouter);

module.exports = app;