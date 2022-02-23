const User=require('../routes/Models/User');
const {getPosition}=require("./location");

function getProfile(req,res) {
    User.findOne({_id:req.params.userId}).exec().then((_user)=>{res.json({user:_user});});
}

function updateProfile(req,res,next) {
    try{
    let address={
        building:parseInt(req.body.building),
        city:req.body.city,
        street:req.body.street
      };

    User.findOne({_id:req.body.userId}).exec().then(userToUpdate=>{
        console.log(userToUpdate);
        if(userToUpdate){
            if (userToUpdate.active) {
                 getPosition(address).then((location)=>{
                    let url='http://localhost:3001/images/users/'+req.body.userId+'.jpg';
                    if(req.files)if(req.files.image)url=userToUpdate.urlImage;
                    User.updateOne(
                        {_id:req.body.userId},
                        {$set:{
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        urlImage:url,
                        phoneNumber:req.body.phoneNumber,
                        email:req.body.email,
                        address:{
                            street:req.body.street,
                            building:req.body.building,
                            city:req.body.city 
                        },
                        position:{
                            lat:String(location.lat),
                            lng:String(location.lon)
                        }
                    }}
                    ).then(()=>{
                        res.locals={userId:req.body.userId};
                        next();
                    });
        
                });
            }
            else  res.status(400).json({error:"user being deleted"});   
        }else  res.status(400).json({error:"cannot find user"});
});
} catch(_error){res.status(400).json({error:_error})}
}



module.exports={getProfile,updateProfile}