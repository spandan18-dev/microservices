const express = require ('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectdb = require('./Db/db');
const cookieParser = require('cookie-parser');
const rabbitMq = require('./service/rabbit');

rabbitMq.connect();

connectdb();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const CaptainRoute = require('./Routes/captain.route');
app.use('/',CaptainRoute);

module.exports = app;