const app = require('./app.js');
const http = require('http');

const server = http.createServer(app);

app.listen(3000,()=>{
    console.log(`User Services http://localhost:3000`)
});