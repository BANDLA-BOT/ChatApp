const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectRoute = async(req,res, next)=>{
    try {
        const token = req.cookies.JwtToken
        if(!token){
            return res.status(401).json ({error:"Unauthorized - No token provided"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if(!decoded){
            return res.status(401).json({Error:"Invalid token"})
        }

        const user = await User.findById(decoded.userId).select('-password')
        if(!user){
            return res.status(404).json({Error:"User not found"})
        }

        req.user = user
        next()

    } catch (error) {
        res.status(500).json({message:"Internal server error", Error:error.message})

    }
}



module.exports = protectRoute