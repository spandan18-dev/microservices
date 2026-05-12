const express = require ('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDb = require('./Db/db');
const cookieParser = require('cookie-parser');
const rabbitMq = require('./service/rabbit');

rabbitMq.connect();
connectDb();

app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(cookieParser());

const rideRoute = require('./Routes/ride.route');

app.use('/',rideRoute);

module.exports = app;