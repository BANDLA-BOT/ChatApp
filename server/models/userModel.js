const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:['male', 'female']
    },
    profilePic:{
        type:String,
        default:''
    }
}, {timestamps:true})
const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel