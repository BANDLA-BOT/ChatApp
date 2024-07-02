const User = require("../models/userModel")
const bcrypt = require('bcryptjs')
const generateToken = require("../utils/generateToken.js");

const login = async(req,res)=>{
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }
        generateToken(user._id, res)
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            userName:user.userName,
            profilePic:user.profilePic
        })
    } catch (error) {
        console.log('Error while login')
        res.status(500).json({message:"Internal server error", error:error.message})
    }
}

const logout = async(req,res)=>{
    try {
        res.cookie('jwtToken', '', {maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log('Error while logout')
        res.status(500).json({message:"Internal server error", error:error.message})
    }
}

const signup = async(req, res)=>{
    try {
        const  {fullName, userName, password, confirmPassword, gender} = req.body

        if(password !== confirmPassword){
            return res.status(400).json({Error:"Passwords did not match"})
        }
        const user = await User.findOne({userName})
        
        if(user){
            return res.status(400).json({error:"Username already exists"})
        }
        //hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)


        //https://avatar.iran.liara.run/public/boy
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`
        const newUser = new User({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilePic:gender === 'male' ?boyProfilePic : girlProfilePic
        })
        if(newUser){
            //generate JWT
            generateToken(newUser._id, res)
            await newUser.save();

        }

        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            userName:newUser.userName,
            profilePic:newUser.profilePic
        })

    } catch (error) {
        res.status(500).json({Error:"Internal server error", error:error.message})
    }
}




module.exports = { login, logout, signup}