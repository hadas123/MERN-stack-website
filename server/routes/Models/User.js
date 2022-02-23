const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    active:mongoose.Schema.Types.Boolean,
    userName:mongoose.Schema.Types.String,
    password:mongoose.Schema.Types.String,
    firstName:mongoose.Schema.Types.String,
    lastName:mongoose.Schema.Types.String,
    urlImage:mongoose.Schema.Types.String,
    phoneNumber:mongoose.Schema.Types.String,
    email:mongoose.Schema.Types.String,
    googleId:mongoose.Schema.Types.String,
    resetCodeUpdateDate:{type:mongoose.Schema.Types.Date,default:new Date('1970-01-01T00:00:00Z')},
    resetCode:mongoose.Schema.Types.String,
    orderIdList:mongoose.Schema.Types.Array,
    role:mongoose.Schema.Types.String,
    address:{
        street:mongoose.Schema.Types.String,
        building:mongoose.Schema.Types.Number,
        city:mongoose.Schema.Types.String   
    },
    position:{
     lat: mongoose.Schema.Types.String,
     lng: mongoose.Schema.Types.String
    }
});


module.exports=mongoose.model('User',UserSchema);