//const db= require('./dbpo');
 //const mongoose = require('mongoose');
//const Joi = require('joi');

const {Genre,validateG} =require('../modules/genre');

const express=require('express');
const router=express.Router();

const auth= require('../Middleware/auth');
const admin= require('../Middleware/admin');
const { exceptions } = require('winston');
//require('express-async-errors');
//const asyncMiddleware=require('../Middleware/async')

//const { route } = require('./genres');
 
//const dbop= require('./DBOp')

// mongoose.connect('mongodb://localhost/vidly')
//     .then( () => console.log('connected to MongoDB...'))
//     .catch( err => console.log('could not connect to MongoDB...',err));

// const genSchema= new mongoose.Schema({
//     id :Number,
//     name : String
// });
//const Genres =mongoose.model('genres',genSchema);

// const genres= [
//     {id:1, name:"Action"},
//     {id:2, name:"Horror"},  
//     {id:3, name:"Comedy"},
// ];

// async function getGenres(val=null){
//     if(val==null){
//         const result= await Genres
//         .find() 
//         .select({id:1,name:1});
//     console.log("temp  " +result);
//     return result;
//     }
//     else{
//         const result= await Genres
//     .find({id:val})
//     .select({id:1,name:1});
//     console.log("temp  " +result);
//     return result;
//     }
// }

// async function addGenres(name) {
//    // console.log("Before    lolzx##########################################");
   
//    const count= await getCount();
   
//     const genre= new Genres({
//         id:count+1,
//         name:name
//     });
//    const isValid= validateG(genre);
//    if(!isValid) {
//        console.log("Invalid Entry");
//        return;
//    }
//     const result= await genre.save();
//  //   console.log("Added    lolzx##########################################");
//     return result;
// }


// async function getCount() {
//     return await Genres.find().count();
// }
//  function asyncMiddleware(handler){
//     return async(req,res,next)=>{
//         try{
//             await handler(req,res);
//         }
//         catch(ex){
//             next(ex);
//         }
//     }
    
// }

router.get('/', async (req,res)=>{    
    throw new Error("this is problem**************************");
        const genres= await Genre.find().sort('name');
        res.send(gengres);    
});


router.get('/:id',async(req,res)=>{
    const genre= await Genre.findById(req.params.id);
    if(!genre){
        console.log("Not Found");
        res.status(404).send("Genra With id not found");
    }
    else{
        console.log(genre);
        res.send(genre);
    }
   
});

router.post('/',auth,async(req,res) => {
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // }); 
    const {error}= validateG(req.body);
    
    if(error){
       // console.log("error!");
        res.status(404).send(error.details[0].message);
        return;
    }
    const genre= new Genre({
        name: req.body.name
    });
    const result =await genre.save();
    console.log(result);
    res.send(result);
});

//  const updateGenres= async (id,name)=>{
//     const gen = await Genres.findOne({id:id});
//     if(!gen){
//         return "invalid entry";        
//     }
//     gen.set({
//         name:name
//     }); 
//     const result= await gen.save();
//     console.log(result);
//     return result;
// };

 router.put('/:id',auth,async (req,res) => {   
    
    
    //console.log("req.body ="+req.body);
    const {error}= validateG(req.body);
    if(error){
        // console.log("error!");
         res.status(404).send(error.details[0].message);
         return;
     }   
     const genre = await Genre.findByIdAndUpdate(req.params.id,{ name:req.body.name},{
         new:true
     });
     
     if(!genre) return res.status(404).send('genra not found');
     res.send(genre);
 });

 

//deleteDB()
 router.delete('/:id',[auth,admin],async (req,res) =>{
     const genre=await Genre.findByIdAndRemove(req.params.id);
     //const gen= await deleteDB(parseInt(req.params.id));
    // const gen= genres.find( c => c.id  === parseInt(req.params.id) );
    // if(!gen){
    //     res.status(404).send("entry not found");
    //     return;
    // }
    // const index=genres.indexOf(gen);
    // genres.splice(index,1);
    if(!genre) return res.status(404).send('genra not found');
     res.send(genre);

 })

//exports.Genre=Genre;
module.exports= router;
