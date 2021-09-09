require('dotenv/config');
//Import Modules
const express = require('express');
const server = express();
const mongoose = require("mongoose");
const jwt = require('./_helpers/jwt');
// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
const cors = require('cors');
// const Admin = require('./models/Admin');



//Import Routes
const arts = require('./controllers/Arts');
const projects = require('./controllers/Projects');
const tattoos = require('./controllers/Tattoos');
const adminController = require('./admin/admin.controller');


server.use('/Images', express.static('./Images'));


//MIDDLEWARE
server.use(cors());
server.use(express.json());
server.use('/Arts', arts);
server.use('/Projects', projects);
server.use('/Tattoos', tattoos);
server.use('/login', adminController);


//JWT
server.use(jwt());


//ROUTES
server.get('/', (req, res) => {
    res.send('GET request to the homepage')
});

//Connect to DB

async function runServer() {
    try{
    await mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }, () => {
        console.log("connected to mongoDb");
    });
    }catch (error){
        console.log(error);
    }
    
    
    server.listen(process.env.PORT || 3000, () => {
        console.log(`Server running at port ${process.env.PORT}`);
    });
}

// function saveAdmin(admin){



// }


exports.runServer = runServer();
