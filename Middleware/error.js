const winston =require('winston');//logger(errors) default logger
            //winston default logger

module.exports=function(err,req,res,next){
     //log the exception for future analysis
     winston.error(err.message,err);
     // error
     // warn
     // info
     // verbose
     // debug
     // silly
     res.status(500).send('Somethingqq Failed');
}