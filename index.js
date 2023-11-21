const express = require("express")
const app = express()
// const PORT = 8000

const {connectMongo}= require("./connect")
const dotenv = require("dotenv")
const fileUpload = require('express-fileupload');
const roomRoute = require('./route/room');
const roomNum = require('./route/roomNumber');
const user = require('./route/user');
const sendEmail = require('./route/sendEmail');
const cors= require("cors")
dotenv.config()



app.use(cors())
app.use(express.json({limit : '90mb'}))
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({useTempFiles:true}))
connectMongo(process.env.URL).then(()=>{
        console.log(`mongo connected ${process.env.URL}`)
        app.listen(process.env.PORT, (error)=>{
                if(error) console.log(error);
                console.log(`listening at port ${process.env.PORT}`)
        })
}).catch((error)=>{
        console.log(error);

})

app.get("/",(req,res)=>{
        res.send("Hello from server")
    })

app.use("/room", roomRoute )
app.use("/roomNumber", roomNum )
app.use("/email", sendEmail )
app.use("/user", user )
// app.listen(PORT,()=>{
//         console.log(`listening at port ${PORT}`)
//      })