const mongoose=require('mongoose');

const ProductSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    active:mongoose.Schema.Types.Boolean,
    name:mongoose.Schema.Types.String,
    urlImage:mongoose.Schema.Types.String
});


module.exports=mongoose.model('Product',ProductSchema);