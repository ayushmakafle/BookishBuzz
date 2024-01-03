const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongoDB database ${mongoose.connection.host}`.yellow)
    }catch(error){
        console.log(`MONGO connect error ${error}`.bgRed.white)
    }
}

module.exports = connectDB