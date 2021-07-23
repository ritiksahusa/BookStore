const express= require('express');
const error=require('../Middleware/error');
const genres= require('../routes/genres');
const customers= require('../routes/customers');
const movies= require('../routes/movies');
const rental=require('../routes/rentals');
const users= require('../routes/users')   ;
const auth = require('../routes/auth');

module.exports= function(app){

    app.use(express.json());//  is require for 
    app.use('/gen',genres);
    app.use('/cust',customers);
    app.use('/movie',movies);
    app.use('/rent',rental);
    app.use('/user', users);
    app.use('/auth',auth);
    app.use(error);//**************************************** 
}