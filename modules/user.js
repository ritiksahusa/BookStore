const mongoose= require('mongoose');
const Joi= require('joi');
const jwt= require('jsonwebtoken');//use to generate web token for json object
const config = require('config');
const { boolean } = require('joi');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minlength:3,
        maxlength:50
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1000
    },
    isAdmin:{
        type: Boolean
    }
});

userSchema.methods.generateAuthToken= function(){
    return jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'))// encypt the json object with key 
}
// above syntax to inject method to schema model
const User= mongoose.model('users',userSchema);

function validateReg(user){
    const schema = Joi.object({
        
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(50).required().email(),
        password: Joi.string().min(3).max(50).required()
       
    });
    return schema.validate(user)
}

exports.User= User;
exports.validateReg=validateReg;