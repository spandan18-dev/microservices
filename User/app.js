const express = require ('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectdb = require('./Db/db');


connectdb();


module.exports = app;