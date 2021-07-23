module.exports= function (handler){
    console.log('awsome');
    console.log("");
    return async(req,res,next)=>{
        try{
            await handler(req,res);
        }
        catch(ex){
            next(ex);
        }
    }
    
}