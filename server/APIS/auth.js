const mongoose=require('mongoose');
const User=require('../routes/Models/User');
const config=require('../config');
const bcrypt=require('bcrypt');
const location=require('./location');
const passport=require('passport');
const {OAuth2Client}=require('google-auth-library');
var client=new OAuth2Client(config.env.GOOGLE_CLIENT);
const genratePassword=require('./passwordGenrator');
var nodemailer = require('nodemailer');
//const {saveImage}=require('./image')




function googleLogIn(req,res){
    let id_token=req.body.token.id_token;
    client.verifyIdToken({idToken:id_token,audience:config.env.GOOGLE_CLIENT}).then((response)=>{
         if(response.payload.email_verified){
            User.findOne({ email: response.payload.email }, function(err, user) {
                if (err) { res.status(400).json({err:"couldnt login1"}); }
                else{
                  if (!user) {res.status(400).json({err:"usr dosent exist please signup"}); }
                  else{
                      req.logIn(user, function (err) {
                        if (err) {  res.status(400).json({err:"couldnt login2"}); }
                        req.session.user=req.user;
                        res.status(200).json({isLogIn:true,role:user.role,user:user});; 
                      }); 
                    }
                  }
              });
          }else{res.status(400).json({err:response.email_verified});}
    });
    
}

function googleRegister(req,res){
    let id_token=req.body.google.tokenId;
     client.verifyIdToken({idToken:id_token,audience:config.env.GOOGLE_CLIENT}).then((response)=>{
        if(response.payload.email_verified){
            User.findOne({email: response.payload.email}).then((resualtUser)=>{
                if(!resualtUser){
                    bcrypt.hash(genratePassword(), config.env.slat, function(err, hash) {
                    new User({
                        _id:mongoose.Types.ObjectId(),
                        userName:req.body.google.profileObj.email,
                        active:true,
                        urlImage:req.body.google.profileObj.imageUrl,
                        orderIdList:[],
                        userName:req.body.google.userName,
                        password:hash,
                        email:req.body.google.profileObj.email,
                        phoneNumber:undefined,
                        firstName:req.body.google.profileObj.givenName,
                        lastName:req.body.google.profileObj.familyName,
                        role:req.body.role, 
                        address:{
                          street:undefined,
                          building:undefined,
                          city:undefined,
                        },
                        position:{
                           lat: undefined,
                           lng: undefined
                        }
                   
                    }).save().then((newUser) =>{res.status(200).json({IsSignUp:true});});
                
                });
                }else{ res.status(400).send("email allready exist");}
            
            });
        }else{res.status(400).json({err:"cannot verify the email"}); }
    });




}


const JWTLogIn=function (req, res, next) {
  console.log("in login:");
    passport.authenticate('local', function (err, user, info) {
    
        if (err) { return next(err) }
        if (!user) {
             req.session.messages = [info.message];
             return res.sendStatus(400);
        }else{
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                 req.user=user;
                req.session.user=req.user;
                return res.status(200).json({isLogIn:true,role:user.role,user:user});; 
            });    
        }

   })(req, res, next);
}


function JWTRegister(req,res,next){
req.body.address={
  building:parseInt(req.body.building),
  city:req.body.city,
  street:req.body.street
};
location.getPosition(req.body.address).then((location)=>{
    User.findOne({userName: req.body.userName}).then((currentUser)=>{
        if(currentUser){
          res.status(400).send("username allready exist");
         
        } else{
          User.findOne({email: req.body.email}).then((resualtUser)=>{
          if(!resualtUser){
          let userId=mongoose.Types.ObjectId(); 
          bcrypt.hash(req.body.password, config.env.slat, function(err, hash) {
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
                    street:req.body.address.street,
                    building:req.body.address.building,
                    city:req.body.address.city,
                },
                role: req.body.role,
                position:{
                     lat: String(location.lat),
                     lng: String(location.lng)
                }
               
            }).save().then((newUser) =>{
                res.locals={userId:userId,IsAddDoesntHaveImage:true};
                next();
            });
          
        });}else{res.status(400).send("email allready exist");}
      
      }); }
    });});

}

function logout(req,res){
  console.log("in logOut:");
  console.log(req.user);
  console.log(req.session.user);
  req.logout();
  // res.clearCookie("connect.sid");
  res.status(200).json({isLogIn:false});
}


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.env.MAIL_ACCOUNT,
      pass: config.env.MAIL_PASSWORD
    }
  });
function SendRestCode(req,res){
    let resetCode=genratePassword();
    var mailOptions = {
      from: config.env.MAIL_ACCOUNT,
      to: req.body.email,
      subject: 'reset your password',
      text: 'This code limit to 5 minute for reset your password:'+resetCode
    };
    User.updateOne({email:req.body.email},{resetCode:resetCode, resetCodeUpdateDate:Date.now() },function(err) {
         if (err) throw err;
         else
         {
            function callback(error, info){
                if (error) {
                  console.log(error);
                } else {
                   res.sendStatus(200);
                  console.log('Email sent: ' + info.response);
                 
                }}
              transporter.sendMail(mailOptions,callback);
          
                
         }
    })
}
function ResetPassword(req,res){
    User.findOne({email:req.body.email},(err, result)=>{
        if (err) throw err;
        else{
          if(result)
            if( result.resetCode===req.body.resetCode){
                let now=new Date().getTime();
                let past=result.resetCodeUpdateDate.getTime();
                let diff=(now-past)/1000;
                if(diff<=300){
                  bcrypt.hash(req.body.newPassword, config.env.slat, function(err, hash) {
                      User.updateOne({email:req.body.email},{password:hash},function(err) {
                          if (err) throw err;
                          else res.sendStatus(200);
                          });
                      });
                
                  }else {res.sendStatus(403);}
            }else{res.sendStatus(403);}
          else{res.sendStatus(403);} 
       }
      });
}

function isLogedIn(req,res){
  console.log("in islogin:");
  console.log(req.user);
  console.log(req.session.user);
  if(req.isAuthenticated())
    res.sendStatus(200);
  else res.sendStatus(400); 
  console.log("end islogin:"); 
}
module.exports={googleLogIn,googleRegister,JWTLogIn,JWTRegister,logout,SendRestCode,ResetPassword,isLogedIn};