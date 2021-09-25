const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongodb = require('./config/config');
const helmet = require('helmet');
const compression = require('compression');
const routing = require('./controller/main');
const app = express();

// getting port from environment

let Port = process.env.Port || 3000;
// global middleware 
app.use(cors())
app.use(express.json())
app.use(compression());
app.use(helmet());
//routes

app.use('/api/v1',routing)

// api

// app.get('/api/v1/test',(req,res)=>{
//     res.status(200).json({status:"Backend is ok"});
// })

app.listen(Port,()=>{
    console.log('server started at'+" "+Port)
})