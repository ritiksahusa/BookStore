const express= require('express');
const app= express();
const winston =require('winston');

   
require('./startup/validation')();
require('./startup/config')();//check privatekey
require('./startup/logging')();//logging errors
require('./startup/database')();//connect db
//connectDB();
require('./startup/routes')(app);//end point outes

const port = 3000;
app.listen(port,() => {
    winston.info(`listening to port = ${port}`);
})