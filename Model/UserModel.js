const mongoose = require('mongoose');
const {isEmail} = require('validator')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique:true
    },
    mobile: {
        type: Number,
        require: true,
        minLength:10

    },
    password: {
        type: String,
        require: true,
        minLength:6
    },
    token:{
        type:String
    }
}, { timestamps: true })

module.exports = mongoose.model("users", UserSchema);