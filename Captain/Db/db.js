const mongoose = require('mongoose');

async function connectDb (){
    try {

        await mongoose.connect(process.env.DB).then(()=>{
            console.log("DB connected....")
        })
        
    } catch (err) {
        
        console.error(err);
        process.exit(1);

    }
}

module.exports = connectDb