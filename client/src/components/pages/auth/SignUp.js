import React, {useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {RegisterLocally,RegisterWithGoogle} from '../../../httpRequests/auth';
import GoogleLogin from 'react-google-login';
import {useHistory} from 'react-router-dom';
import { Radio,RadioGroup,FormControlLabel } from '@material-ui/core';
// var validator = require('validator');

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    height: theme.spacing(18),
    width: theme.spacing(18), 
    alignItems: 'center'
    
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export  function SignUp() {
  const history = useHistory();
  const classes = useStyles();
  const [image, setImage] = useState("https://image.flaticon.com/icons/png/256/747/747376.png")
  const [imageFile,SetImageFile]=useState('');
  const [data,setData]=useState({
    firstName:'',lastName:'',
    userName:'',password:'' ,
    phoneNumber:'', email:'',   
    city:'', street:'',building:'0',role:'customer'  
  });

  const handel=(e)=>{
    const nweData={...data};
    nweData[e.target.id]=e.target.value;
    setData(nweData);
    console.log(data);
  }

  function handleRegisterWithGoogle(res){
    (RegisterWithGoogle(res)).then((registered)=>{
      if(registered){
        history.push('/signIn');
      };
    });
  }
  function handleRegister(data,imageFile){
    (RegisterLocally(data,imageFile)).then((registered)=>{
      if(registered){
        history.push('/signIn');
      };
    });
  }

  
  const onImageChange = (event) => {
   if (event.target.files && event.target.files[0]) {
     {setImage(URL.createObjectURL(event.target.files[0]));
      SetImageFile(event.target.files[0]);
     }
   }
  }
  const inputFileRef = useRef( null );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar onClick={()=>{inputFileRef.current.click();}} className={classes.avatar}>
          <img width="100%" src={image}/>  
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={(e)=>{e.preventDefault(); handleRegister(data,imageFile);}} enctype="multipart/form-data" className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
          <input type="file" name='image' ref={inputFileRef} style={{display:"none"}} onChange={onImageChange} accept="image/*" />
              <TextField
                autoComplete="userName"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="user name"
                autoFocus
                onChange={(e)=>{handel(e)}}
              />
            </Grid>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>{handel(e)}}
              />
            </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e)=>{handel(e)}}
              />
            </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e)=>{handel(e)}}
              />
            </Grid>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={(e)=>{handel(e)}}
              />
            </Grid>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="phone number"
                name="phoneNumber"
                autoComplete="phone"
                onChange={(e)=>{handel(e)}}
              />
            </Grid>
          <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="city"
                name="city"
                autoComplete="city"
                onChange={(e)=>{handel(e)}}
              />
            </Grid>
          <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="street"
                label="street"
                name="steet"
                autoComplete="street"
                onChange={(e)=>{handel(e)}}
              />
            </Grid>  
          <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="building"
                label="building"
                name="building"
                autoComplete="building"
                onChange={(e)=>{handel(e)}}
              />
              </Grid>
              
          </Grid >
          <div >
              <RadioGroup style={{marginLeft:110, marginTop:20}} row onChange={(e)=>{handel(e)}} id="role" name="role" defaultValue={'customer'}>
                <FormControlLabel  value="customer"  control={<Radio id="role" color="primary"/>} label="Customer" />
                <FormControlLabel  value='deliverer' control={<Radio id="role" color="primary"/>} label='Deliverer' />
              </RadioGroup>
            </div>
        
          <Button style={{textTransform: 'lowercase',fontSize:18}} type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
            Sign Up
          </Button>    
          <GoogleLogin clientId={'yourClientId'} buttonText="Customer Sign up"
              onSuccess={(res) => {handleRegisterWithGoogle({google:res, role:"deliverer"});}}
              onFailure={(res) => { console.log(res);}}
              cookiePolicy={'single_host_origin'} />
          <span style={{marginRight:15}}/>
          <GoogleLogin clientId={'yourClientId'} buttonText="Deliverer Sign up"
              onSuccess={(res) => {handleRegisterWithGoogle({google:res, role:"customer"});}}
              onFailure={(res) => { console.log(res);}}
              cookiePolicy={'single_host_origin'}/>
         
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/signIn" variant="body2">Already have an account? Sign in </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     
    </Container>
  );
}