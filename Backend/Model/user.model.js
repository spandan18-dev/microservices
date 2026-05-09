const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required: true,
            minlength:[3,"Name must be 3 char long"]
        },
         lastname : {
            type : String,
        }
    },

    email :{
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required:true,
        select: false
    },

    socketId : {
        type : String
    }
});

userSchema.methods.generateToken = function () {
    const token = jwt.sign({_id : this._id},process.env.JWT);
    return token;
}

userSchema.methods.comparePassword = function (password){
    return bcrypt.compare(password,this.password );
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}


const userModel = mongoose.model('user',userSchema);

module.exports = userModel;