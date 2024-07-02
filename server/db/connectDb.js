const mongoose = require('mongoose');
require('dotenv').config

const connectToDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('Connected to Database')
    } catch (error) {
        console.log('Error connecting to MongoDb', error.message)
    }
}
module.exports = connectToDb