const Order=require('../routes/Models/Orders');
const User=require('../routes/Models/User');
const {getPosition}=require("./location");
const config=require('../config');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const genratePassword=require('./passwordGenrator');
const { getUserChat} = require('./chat');


////
//get
////
function getAllUsers(req,res){
    User.find({active:true}).exec().then((UserList)=>{res.json({users:UserList});});
}
function getCustomers(req,res){
    User.find({active:true,role:"customer"}).exec().then((UserList)=>{res.json({users:UserList});});
}
function getDeliverers(req,res){
    User.find({active:true,role:"deliverer"}).exec().then((UserList)=>{res.json({users:UserList});});
}

////
//add
////

function newUserByAdmnistrtor(req,_role){
    return new Promise((resolve,reject)=>{
       
    getPosition(req.body.address).then((location)=>{

        bcrypt.hash(genratePassword(),config.env.slat, function(err, hash) {
           
            let customer=new User({
                _id:mongoose.Types.ObjectId(),
                active:true,
                userName:req.body.userName,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                urlImage:req.body.urlImage,
                phoneNumber:req.body.phoneNumber,
                email:req.body.email,
                role:_role,
                address:{
                    street:req.body.address.street,
                    building:req.body.address.building,
                    city:req.body.address.city   
                },
                orderIdList:[],
                googleId:undefined,
                password:hash,
                position: {
                    lat:String(location.lat),
                    lng:String(location.lng)
                }
            
            });
            customer.save().then(resolve(200,undefined)); 
        });
    }).catch((_err)=>{resolve(400,_err);});
})
}
function activateUserByAdmnistrtor(req,_role){
    return new Promise((resolve,reject)=>{
        getPosition(req.body.adress).then((location)=>{
        bcrypt.hash(genratePassword(), config.env.slat, function(err, hash) {
            User.updateOne({_id:req.body.userId},
                {$set:{
                active:true,    
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                urlImage:req.body.urlImage,
                phoneNumber:req.body.phoneNumber,
                email:req.body.email,
                password:hash,
                address:{
                    street:req.body.address.street,
                    building:req.body.address.building,
                    city:req.body.address.city 
                },
                position:{
                    lat:String(location.lat),
                    lng:String(location.lng)
                }
            }}
            ).then(()=>{resolve(200,undefined);});
        });
        }).catch((_err)=>{resolve(400,_err);});;    
    });
}

function addCustomerByAdmnistrtor(req,res,next){
    User.findOne({userName:req.body.userName}).exec().then(user1=>{
        User.findOne({email:req.body.email}).exec().then(user2=>{
        if(user1||user2)
            if (user1.active||user2.active)
                res.status(400).json({err:"user with that email or username already exist"});
            else activateUser(req,"customer").then((status,_err)=>{(status==200)?res.sendStatus(status):res.status(status).json({err:_err})});   
        else newUser(req,"customer").then((status,_err)=>{(status==200)?res.sendStatus(status):res.status(status).json({err:_err})});   
       
    });});  
}
function addDelivererByAdmnistrtor(req,res){
    User.findOne({userName:req.body.userName,email:req.body.email}).exec().then(user=>{
        if(user)
            if (user.active)
                res.status(400).json({err:"user with that email or username already exist"});
            else activateUser(req,"deliverer").then((status,_err)=>{(status==200)?res.sendStatus(status):res.status(status).json({err:_err})});     
        else newUser(req,"deliverer").then((status,_err)=>{(status==200)?res.sendStatus(status):res.status(status).json({err:_err})});   
       
    }); 
}




function AddUser(req,res,next){
    try{
    let address={
        building:parseInt(req.body.building),
        city:req.body.city,
        street:req.body.street
      };
      getPosition(address).then((location)=>{
          User.findOne({userName: req.body.userName}).then((currentUser)=>{
              if(currentUser){
                if(currentUser.active)res.status(400).json({error:"username allready exist"});
                if(!currentUser.active)res.status(400).json({error:"this user allready been  deleted try other username"});
              } else{
                User.findOne({email: req.body.email}).then((resualtUser)=>{
                    if(resualtUser){
                        if(resualtUser.active)res.status(400).json({error:"email allready exist"});
                        if(!resualtUser.active)res.status(400).json({error:"this user allready been  deleted try other email"});
                    }
                    if(!resualtUser){
                        let userId=mongoose.Types.ObjectId(); 
                        bcrypt.hash(genratePassword(), config.env.slat, function(err, hash) {
                        new User({
                            _id:userId,
                            active:true,
                            urlImage:'http://localhost:3001/images/users/'+userId+'.jpg',
                            userName:req.body.userName,
                            password:hash,
                            email:req.body.email,
                            phoneNumber:req.body.phoneNumber,
                            firstName:req.body.firstName,
                            lastName:req.body.lastName,
                            address:{
                                street:address.street,
                                building:address.building,
                                city:address.city,
                            },
                            role: req.body.role,
                            position:{
                                lat: String(location.lat),
                                lng: String(location.lng)
                            }
                            
                        }).save().then((newUser) =>{
                            let IsAddDoesntHaveImage=true;
                            if(req.files)if(req.files.image)IsAddDoesntHaveImage=false;
                            res.locals={userId:userId,IsAddDoesntHaveImage:IsAddDoesntHaveImage};
                            getUserChat(userId,req.body.userName, req.body.email,req.body.firstName, req.body.lastName);
                            next();
                        });
                        
                    });}
            
            }); }
          });});
        } catch(_error){res.status(400).json({error:_error})}


     
}


























////
//update
////
function updateUserByAdmnistrtor(req,res){
        User.findOne({_id:req.body.userId,active:true}).exec().then(userToUpdate=>{
            if(userToUpdate){
                if (userToUpdate.active)
                    getPosition(req.body.adress).then((location)=>{
                        User.updateOne(
                            {_id:req.body.userId},
                            {$set:{
                            firstName:req.body.firstName,
                            lastName:req.body.lastName,
                            urlImage:req.body.urlImage,
                            phoneNumber:req.body.phoneNumber,
                            email:req.body.email,
                            address:{
                                street:req.body.address.street,
                                building:req.body.address.building,
                                city:req.body.address.city 
                            },
                            position:{
                                lat:String(location.lat),
                                lng:String(location.lon)
                            }
                        }}
                        ).then(()=>{res.sendStatus(200);});
            
                    });
       
                else  res.status(400).json({error:"user being deleted"});   
            }else  res.status(400).json({error:"cannot find user"});
    });
}

////
//delete
////
function isActiveOrder(orderNumber){
        Order.findOne({_id:orderNumber}).exec().then((order)=>{
            if(orders) return true;
            else false;
        })
}
function deleteUser(req,res){
    User.findOne({_id:req.params.userId,active:true}).exec().then(userToUpdate=>{
        if(userToUpdate){
            
            if (userToUpdate.orderIdList.every(isActiveOrder)){
                User.updateOne({_id:req.params.userId},
                    {$set:{
                        active:false,
                    }}
                ).then(()=>{res.sendStatus(200);});
            }
            else  res.status(400).json({error:"cannot delete user.user being deleted or user have active orders"});   
        }else  res.status(400).json({error:"cannot find user"});
    });

}


module.exports={getAllUsers,getCustomers,getDeliverers,addCustomerByAdmnistrtor,addDelivererByAdmnistrtor,updateUserByAdmnistrtor,deleteUser,AddUser};