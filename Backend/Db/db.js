const mongoose = require('mongoose');

module.exports = async function connectDb () {
    try {
        await mongoose.connect(process.env.DB).then(()=>{
            console.log("Db connected");
        })
    
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}