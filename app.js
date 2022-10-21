require('dotenv').config()
const express=require('express')
const connectDB=require('./db/connect')
const app=express()
const productsRouter=require('./routes/products')
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
app.use(express.json())
app.get("/",(req,res)=>{
    res.send('<h1><h1>Store API</h1><a href="/api/v1/products">products route</a></h1>')
})
app.use('/api/v1/products', productsRouter)
app.use(notFoundMiddleware)
app.use(errorMiddleware)
const PORT =process.env.PORT||3000
const start=async ()=>{
    try{
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT,console.log("Listening "+PORT))
    }catch(error){
   console.log(error);
    }
}
start()

