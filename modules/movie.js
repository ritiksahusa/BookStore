const mongoose=require('mongoose');
const Joi = require('joi');
const {genSchema}=require('./genre');

//const Genres=mongoose.model('genres',genSchema);

const movieSchema= new mongoose.Schema({
    title:{
        type: String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:255
    },
    genres:{
        type:genSchema,
        //ref:"Genres",
        //required:true
    },
    numbersInStock:{
        type: Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type: Number,
        required:true,
        min:0,
        max:255
    }
})
const Movie= mongoose.model('movies',movieSchema);

function validateM(movie){
    const schema = Joi.object({
        //id: Joi.number(),
        genreId: Joi.objectId().required(),
        title: Joi.string().min(3).max(50).required(),
        numbersInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });
    return schema.validate(movie)
}


exports.validateM=validateM;
exports.Movie=Movie;