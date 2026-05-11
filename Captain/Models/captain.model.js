const mongoose = require('mongoose');

const captainSchema = new mongoose.Schema({

    name : {
        type:String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true,
        select : false
    },

    isAvalable : {
        type : Boolean,
        default : false
    }

});

const userModel = mongoose.model("captain",captainSchema);

module.exports = userModel;