const winston =require('winston');//logger(errors) default logger
                                    //winston default logger
// require('winston-mongodb');
require('express-async-errors');// no need to save it to any constant
                                // this wont break code if exception occurs.

module.exports= function (){
    
// process.on('uncaughtException',(ex)=>{
//     console.log('got uncaught ex');
//     winston.error(ex.message,ex);
// })

// detect exception outside express scope
// process.on('uncaughtException',(ex)=>{
//     console.log('got uncaught ex');
//     winston.error(ex.message,ex);// logging to console
//     process.exit(1);// best practice we should restart the process
// })
    //when we have exception in the node process but no where we have handeled the exception using a catch block catch block 
winston.handleExceptions(
    new winston.transports.Console({colorize:true,PerttyPrint:true}),
    
    new winston.transports.File({ filename:'uncaughtException.log'}));
// detect promise rejection outside express scope
process.on('unhandledRejection',(ex)=>{
    console.log('got uncaught rejection');
    throw ex;// throwing rejection error as exception
});    


winston.add(winston.transports.File,{filename:'logger.log'});
// winston.add(winston.transports.MongoDB,{ db: 'mongodb://localhost/vidly',
//     level: 'info'
// });
 }