const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./Db/db.js')
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended :true}))

connectDb();

// Routes 
const authRouter = require('./routes/user.route.js')

app.use('/api/auth',authRouter);

module.exports = app;