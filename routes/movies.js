const {Genre}=  require('../modules/genre');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();

const {Movie,validateM}=    require('../modules/movie');
const auth= require('../Middleware/auth');

// mongoose.connect('mongodb://localhost/vidly')
//     .then( () => console.log('connected to MongoDB...'))
//     .catch( err => console.log('could not connect to MongoDB...',err));

// const genSchema= new mongoose.Schema({  
//     name : String
// });
//const Genres =mongoose.model('genres',genSchema);
//const Movies =mongoose.model('movie',movieSchema);
//const Genres=mongoose.model('genres',genSchema);


// async function addMovie(title,gen,numbersInStock=0,dailyRentalRate=0){
//     const movie= new Movies({
//         title,
//         genres: new Genres({
//             id:0,
//             name:gen
//         }),        
//         numbersInStock,
//         dailyRentalRate              
//     })
//     //console.log(Genres.findById(gen));
//     const result= await movie.save();
//    console.log("done");
//     console.log(result);
//     return result;
// }
//addMovie("Chota Don","Action");
// console.log("fun");

// async function getMovies(id=null){
//     if(id==null){
//         const movies= await Movies.find()
//     .select('title genres numbersInStock dailyRentalRate');
//     // //.populate('genres','name')
//     // ;
//     console.log(movies);
//     return movies;
//     }
//     else{
//         console.log(typeof id);
//         if( !mongoose.Types.ObjectId.isValid(id) ) return null;
//         const movie= await Movies.findById(id);
//         //.select('name genres')
//        // .populate('genres','_id')
//        // ;
//        console.log(movie);
//        if(movie==null){
//            console.log("Se nal");
//        }
//        return movie;
//     }
   
   
// }


router.get('/', async (req,res)=>{
   // console.log("get blank activated");
    const result= await Movie.find();
    res.send(result);
});
router.get('/:id',async(req,res)=>{
    const movie= await Movie.findById(req.params.id);
    if(!movie){
        return res.status(404).send("Movie With id Not found");
    }

   // const result =await getMovies(req.params.id);
   // const gen = genres.find(c => c.id === parseInt(req.params.id))
   //console.log(result.length);    
//    if(result.length>0){
//         res.send(result[0].name);
//         return;
//     }
    // if(result==null)
    //     res.status(404).send("given Movie id not found");
    res.send(movie);
});

router.post('/',auth,async(req,res) => {
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // }); 
    const {error}= validateM(req.body);
    
    if(error){
       // console.log("error!");
        res.status(400).send(error.details[0].message);
        return;
    }
    const genre= await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');


    const movie = new Movie({
        title: req.body.title,
        genres:genre,
        numbersInStock:req.body.numbersInStock,
        dailyRentalRate:req.body.dailyRentalRate
        
    })
    const result =await movie.save();
    // const gen ={
    //     id:Genres.count('id'),
    //     name: req.body.name,
    // };

    // genres.push(gen);
    res.send(result);
});

//  const updateGenres= async (id,name)=>{
//     if( !mongoose.Types.ObjectId.isValid(id) ) return null;
//     const gen = await Movies.findById(id);
//     if (gen==null) {
//         console.log("gen is null");
//         console.log(gen);
//         return null;
//     }
    
//     gen.set({
//         title:name
//     }); 
//     console.log(gen);
//     const result= await gen.save();
//     console.log(result);
//     return result;
// };

 router.put('/:id',auth,async (req,res) => {      
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // });
    //console.log("req.body ="+req.body);

    const {error}= validateM(req.body);
    
    if(error)
        return res.status(400).send(error.details[0].message);
      
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid id');
     
     const  movie= await Movie.findByIdAndUpdate(req.params.id,{
         title:req.body.title,
         genres:{
             _id:genre._id,
             name: genre.name
         }
     },{new:true});
     if (!movie) return res.status(400).send('Invalid genre.');
     console.log(movie);
     res.send(movie);

     
 });

 // deletenot working...
 
// async function deleteDB(i){
//     const course= await Genres.findOneAndDelete({id:i});
//     return course;
// };
//deleteDB()
 router.delete('/:id',auth,async (req,res) =>{
     const gen= await Movie.findByIdAndDelete(req.params.id);
    // const gen= genres.find( c => c.id  === parseInt(req.params.id) );
    // if(!gen){
    //     res.status(404).send("entry not found");
    //     return;
    // }
    // const index=genres.indexOf(gen);
    // genres.splice(index,1);
    console.log(gen);
    res.send(gen);

 })

//listAll();


// async function addGenre(movId,genId){
//     const movie= await Movies.findById(movId);    
//     console.log("showing");
//     console.log(movie.genres);
//     movie.genres.push(genId);
//    movie.save();
//     console.log(movie.genres);
// }

// addGenre('60409703203cd24314fbf117',new Genres(
//     {name: 'boston'}
// ));




module.exports= router;