const express = require ('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDb = require('./Db/db');

connectDb();


module.exports = app;