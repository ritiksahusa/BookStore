const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
    .then( () => console.log('connected to MongoDB...'))
    .catch( err => console.log('could not connect to MongoDB...',err));


const custSchema= new mongoose.Schema({
    id: Number,
    isGold: Boolean,
    name: String,
    phone: Number
});

const Customers = mongoose.model('customers',custSchema);




async function addCustomers(id,ig,name,phone){
const customer= new Customers({
    id:id,
    isGold: ig,
    name:name,
    phone:phone
});
const result=await customer.save();
console.log(result);
return result;
}
addCustomers(1,false,"ritik",1234);
