const mongoose= require('mongoose');
//const Joi = require('joi');
const {Customer,validateC} =require('../modules/customer');
const express=require('express');
const router=express.Router();

//const { route } = require('./genres');

const auth= require('../Middleware/auth');
// mongoose.connect('mongodb://localhost/vidly')
//     .then( () => console.log('connected to MongoDB...'))
//     .catch( err => console.log('could not connect to MongoDB...',err));

//const Customers = mongoose.model('customers',Customer);

// async function addCustomers(ig,name,phone){
// const customer= new Customer({
    
//      ig,
//     name,
//     phone
// });
// const result=await customer.save();
// console.log(result);
// return result;
// }
//addCustomers(1,false,"ritik",1234);
//addCustomers(2,true,"rahul",1234);
//addCustomers(3,false,"rohit",1234);


router.get("/",async (req,res)=>{
    const result= await Customer.find();
    console.log(result);
    res.send(result);
});

router.get("/:id",async (req,res)=>{
    const result= await Customer.findById(req.params.id);
   // const result=await Customers.find({id:parseInt(req.params.id)});
    if(!result ){
       // console.log("Customer Not found");
        res.status(404).send("No Such Customers");
        return;
    }
    //console.log("its get request");
    console.log(result);
    res.send(result);
});

router.put("/:id",auth,async (req,res)=>{
    
    //console.log("req.body ="+req.body);
    const {error} = validateC(req.body);
    if(error){
        res.status(404).send(error.details[0].message);
    }
    console.log("req.body");
    console.log(req.body);
    const customer = await Customer.findById(req.params.id);
    console.log(customer);
    //const customer= await Customers.findOne({id:req.params.id});
    if(!customer){
        console.log("invalid entry");
        res.status(404).send("Customer with id not found");        
    }
    customer.set({ 
        name:req.body.name,
       // phone:req.body.phone        
    }); 
    const result =await customer.save();
    console.log(result);
    res.send(result);
});

router.post("/",auth,async (req,res)=>{
    const {error}=validateC(req.body)
    if(error){
        res.status(404).send(error.details[0].message);
    }
    else{
        console.log("all ok");
    }
    const customer = new Customer({
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone
    })

    const result=await customer.save();
    //const result= await addCustomers(req.body.isGold,req.body.name,req.body.phone);
    console.log(result);
    res.send(result);
       // addCustomers(false,"Ritik",1234);
})
router.delete("/:id",auth,async (req,res)=>{
    const course = await Customers.findOneAndDelete({id:req.params.id});
    console.log(course);
    res.send(course);

});

module.exports=router;