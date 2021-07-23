const {Rental, validateR} = require('../modules/rental'); 
const {Movie} = require('../modules/movie'); 
const {Customer} = require('../modules/customer'); 
const Fawn = require('fawn');//FAWN is used to introduce atomacity
                            // Look try catch  Section below for more details
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth= require('../Middleware/auth');
Fawn.init(mongoose);// we  need to pass the function inside FAWN.

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
  });
router.post('/',auth, async (req, res) => {
    const { error } = validateR(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');
  
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');
  
    if (movie.numbersInStock === 0) return res.status(400).send('Movie not in stock.');
  
    let rental = new Rental({ 
      customer: {
        _id: customer._id,
        name: customer.name, 
        phone: customer.phone
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      }
    });
 

    // rental = await rental.save();
  
    // movie.numberInStock--;
    // movie.save();

  //line above three lines we are doing two  operation
    // 1. saving new rental
    // 2. decrementig te umber of stocks avalible
    // there are possibilities thatprogram may crash at any time 
    // and if it happen we must ensure that the two process happen at the same time
    // or none( the concept of atomicity)
    //this ensured by below code

    try{
        new Fawn.Task()
        .save('rentals',rental) 
        .update('movies',{_id:movie._id},{
            $inc:{ numbersInStock:-1}
        })
        .run();
    }
    catch(ex){// send error input
        res.status(500).send('Something failed.');
    }
    
    
    res.send(rental);
  });

  router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
  
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  
    res.send(rental);
  });
  
  module.exports = router; 
