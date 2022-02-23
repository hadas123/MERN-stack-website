const createError = require('http-errors');
const express = require('express');
var app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose=require('mongoose');
const config=require("./config");
const bodyParse=require('body-parser');
const cors=require('cors');
const session=require('express-session');
const formData = require('express-form-data');

app.use(formData.parse());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(config.env.MONGO_ATLAST_PW+"?authMechanism=SCRAM-SHA-1",{ useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));
app.use(cors({origin:"http://localhost:3000",credentials:true}));


const secret="mysecretcodeisnotverysecret";
app.use(session({secret:secret,resave:true,saveUninitialized:true}))
app.use(cookieParser(secret));
var passport=require('passport');
app.use(passport.initialize());
app.use(passport.session());
var LocalStrategy = require('passport-local').Strategy;
app.use(express.static(path.join(__dirname, 'public')));




const indexRouter = require('./routes/routers/index');
const CustomerRouter=require('./routes/routers/Customer');
const DelivererRouter=require('./routes/routers/Deliverer');
const AdministratorRouter=require('./routes/routers/Administrator');
const profile=require('./routes/routers/User/profile');
const auth=require('./routes/routers/User/auth');
const blog=require('./routes/routers/User/blog');

app.use('/', indexRouter);
app.use('/deliverer',DelivererRouter);
app.use('/customer',CustomerRouter);
app.use('/administrator',AdministratorRouter);
app.use('/user/profile',profile);
app.use('/user/auth',auth);
app.use('/user/blog',blog);


// ---------------Login------------------------------///


const User=require('./routes/Models/User');
const bcrypt = require('bcrypt');

passport.use(
    new LocalStrategy({usernameField:'email',passwordField:'password'},
    function authenticateUser(username, password, done){ 
      User.findOne({ email: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
       
        bcrypt.compare(password, user.password, function(err, result) {
          if(result==false){
            return done(null, false, { message: 'Incorrect password.' });
          }else{
            return done(null, user);
          }
  
      });

      });
    })
    );

    
  
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findOne({_id:id}, function(err, user) {
      done(err, user);
    });
  });


module.exports = app;
