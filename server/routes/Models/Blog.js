const mongoose=require('mongoose');

const BlogSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   creationDate:mongoose.Schema.Types.Date,
   title:mongoose.Schema.Types.String,
   content:mongoose.Schema.Types.String
   
});

module.exports=mongoose.model('Blog',BlogSchema);