const express = require ('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectdb = require('./Db/db');
const cookieParser = require('cookie-parser');
const rabbitMq = require('./services/rabbit');

rabbitMq.connect();

connectdb();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const userRouter = require('./Routes/user.route');
app.use('/',userRouter);

module.exports = app;