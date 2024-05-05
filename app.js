const express=require('express')
const cors=require('cors')
const connectDB = require('./DB/config')
const morgan = require('morgan')
const compression =require("compression")
const { notFound, handleError } = require('./middleware/error')

require('dotenv').config()

//db connect
connectDB()
//env
port=process.env.PORT

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(compression())
//router
app.use(`/api/v1/auth`,require('./router/authRoute'))
app.use(`/api/v1/category`,require('./router/categoryRoute'))
app.use(`/api/v1/product`,require('./router/productRoute'))
app.use(`/api/v1/user`,require('./router/user'))

app.use(notFound)
app.use(handleError)


app.listen(port,()=>{
    console.log(`app is running on ${port} `)
})
