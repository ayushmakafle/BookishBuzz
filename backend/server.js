const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const colors = require("colors")
const dotenv = require("dotenv")
const connectDB = require("./config/connectDB")

//env config
dotenv.config()

//router import
const userRoutes = require('./routes/userRoutes')

connectDB()

//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/user',userRoutes)

const PORT = process.env.PORT || 8080
//listen
app.listen(PORT, () => {
    console.log(`server running ${process.env.DEV_MODE} on port ${PORT}`.underline.green)
})