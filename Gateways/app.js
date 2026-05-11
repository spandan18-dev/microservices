const express = require('express');
const proxy = require('express-http-proxy');
const app = express();

// User Services
app.use('/api/user',proxy("http://localhost:3001"));

// Captain Service 
app.use('/api/captain', proxy("http://localhost:3002"));

//Ride Service 
app.use('/api/ride',proxy("http://localhost:3003"))


app.listen(3000,()=>{
    console.log("http://localhost:3000")
})


 