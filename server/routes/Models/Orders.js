const mongoose=require('mongoose');

const OrderSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   productList:mongoose.Schema.Types.Array,
   status: ['new','in progress','delivered'],
   customerId:mongoose.Schema.Types.ObjectId,
   deliverId:mongoose.Schema.Types.ObjectId,
   creationDate:mongoose.Schema.Types.Date,
   ExpectedDeliverDate:mongoose.Schema.Types.Date,
   DeliverDate:mongoose.Schema.Types.Date,
   address:{
       street:mongoose.Schema.Types.String,
       building:mongoose.Schema.Types.Number,
       city:mongoose.Schema.Types.String   
   },
   position:{
    lat: mongoose.Schema.Types.String ,
    lng: mongoose.Schema.Types.String
   }



});


module.exports=mongoose.model('Order',OrderSchema);