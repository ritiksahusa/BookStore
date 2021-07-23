const mongoose = require('mongoose');
const Joi = require('joi');
//const { number } = require('joi');

const genSchema= new mongoose.Schema({
   
    name : {
        type:String,
        requrired:true,
        min:3,
        max:255
    }
});

const Genre = mongoose.model('genres',genSchema);

function validateG(genre){
    const schema = Joi.object({
         name: Joi.string().min(3).max(50).required()
    });
    return schema.validate(genre);

}
exports.validateG=validateG;
exports.genSchema=genSchema;
exports.Genre = Genre;