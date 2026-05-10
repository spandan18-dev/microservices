const express = require('express');
const proxy = require('express-http-proxy');
const app = express();

app.use('/api/user',proxy("http://localhost:3001"))


app.listen(3000,()=>{
    console.log("http://localhost:3000")
})


