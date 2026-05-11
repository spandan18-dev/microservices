const app = require('./app.js');
const http = require('http');

const server = http.createServer(app);

app.listen(process.env.PORT,()=>{
    console.log(`Captain Services http://localhost:${process.env.PORT}`)
});