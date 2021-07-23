const _ = require('lodash');//for specific selection 
                            //you may get lots of proper ty but you want to select only a few
const bcrypt= require('bcrypt');// use to encrypt
                                // generate salt and ecrypt the message
                               
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
 

const {User,validateReg} = require('../modules/user');
const jwt= require('jsonwebtoken');//use to generate web token for json object
const config = require('config');
const auth= require('../Middleware/auth');

router.get('/me',auth,async (req,res)=>{
    const user= await User.findById(req.user._id).select('-password');
    res.send(user);
})

router.post('/',auth,async (req,res)=>{
    const {error}=validateReg(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

    let user= await User.findOne({ email: req.body.email});
   // if(user.name) console.log("yes");
    if(user){
        console.log(user.email);
        console.log(req.body.email);
        return res.status(400).send(" ss"+req.body.email+'User Already registered'+user.email+"kk");
    }                                                

    //  user= new User({
    //     name:req.body.name,
    //     email:req.body.email,
    //     password:req.body.password
    // })
    user = new User(_.pick(req.body, ['name','email','password']));
    const salt = await bcrypt.genSalt(10);    
    user.password=  await bcrypt.hash(user.password,salt);
    await user.save();

    const token= user.generateAuthToken();
    console.log(token);
    //const token=jwt.sign({_id:user._id},config.get('jwtPrivateKey'))// encypt the json object with key 
    const result= _.pick(user,['_id','name','email ']);
    console.log(result);
    res.header('x-auth-token',token).send(result);
        // setting hedder while giing output
    
});



module.exports=router;