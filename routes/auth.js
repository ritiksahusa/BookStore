
const _ = require('lodash');//for specific selection 
                            //you may get lots of proper ty but you want to select only a few
const bcrypt= require('bcrypt');// use to encrypt
                                // generate salt and ecrypt the message
                                
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const {User}=    require('../modules/user');
const Joi = require('joi');

const jwt= require('jsonwebtoken');//use to generate web token for json object
const config = require('config');
//const auth= require('../Middleware/auth');

router.post('/',async (req,res)=>{
    console.log();
    const {error}=validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

    let user= await User.findOne({ email: req.body.email});
   // if(user.name) console.log("yes");
    if(!user){
        console.log(user.email);
        console.log(req.body.email);
        return res.status(400).send(" Invalid (Email) or Password");
    }                                                
   // console.log(await bcrypt.);
    const validPassword= await bcrypt.compare(req.body.password,user.password)
    if(!validPassword){
        return res.status(400).send('Invalid Email or (Password)');
    }
    
    //const token=jwt.sign({_id:user._id},config.get('jwtPrivateKey'))// encypt the json object with key 
    
    const token= user.generateAuthToken();
    res.header('x-auth-token',token).send(token);
});

function validate(req){
    const schema = Joi.object({
        email: Joi.string().min(3).max(50).required().email(),
        password: Joi.string().min(3).max(250).required()
    });
    return schema.validate(req)
}

module.exports=router;