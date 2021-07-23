const mongoose= require('mongoose');
const Joi = require('joi');

const customer= new mongoose.Schema({
    isGold:{
        type:Boolean,
        default: false
    } ,
    name: {
        type: String,
        required: true,
        minlength:3,
        maxlength:50
    },
    phone: {
        type: String,
        required: true,
        min:3,
        max:50
    }
    
});

const Customer=mongoose.model('customer',customer);

function validateC(customer){
   
    const schema = Joi.object({
      //  id: Joi.number(),
        name: Joi.string().min(3).max(50).required(),          
        phone: Joi.string().min(3).max(50).required(),
        isGold: Joi.boolean()
    }); 
     return schema.validate(customer);
     
}

exports.Customer=Customer;
exports.validateC=validateC;
