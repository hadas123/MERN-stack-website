import  { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GoogleLogin from 'react-google-login';
import { Box } from '@material-ui/core';
import {LoginLocally,LoginWithGoogle,IsLogedIn} from '../../../httpRequests/auth';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import actionCreators from '../../../state/action-creators/index';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.text.disabled ,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export  function SignIn() {
  const history = useHistory();
  const state=useSelector((state)=>state);
  const dispach=useDispatch();
  const {login,setRoleToAdministrator,setRoleToDeliverer,setRoleToCustomer,setUser}=bindActionCreators(actionCreators,dispach);
  const classes = useStyles();
  const [data,setData]=useState({password:'' , email:''});
  const handel=(e)=>{
    const nweData={...data};
    nweData[e.target.id]=e.target.value;
    setData(nweData);
  };
  function handleLoginWithGoogle(res){
    (LoginWithGoogle(res)).then((res)=>{
      setUser(res.user);  
      if(res.isLogIn){
        login();
        if(res.role==="customer"){setRoleToCustomer();}
        if(res.role==="deliverer"){setRoleToDeliverer();}
        if(res.role==="administrator"){setRoleToAdministrator();}
        localStorage.setItem('user', JSON.stringify(res.user));
        history.push('/');
      }
    });
 
  }
  function handleLogin(data){
    (LoginLocally(data)).then((res)=>{
      setUser(res.user); 
      if(res.isLogIn){
          login();
          if(res.role==="customer"){setRoleToCustomer();}
          if(res.role==="deliverer"){setRoleToDeliverer();}
          if(res.rolerole==="administrator"){setRoleToAdministrator();}
          localStorage.setItem('user', JSON.stringify(res.user));
          history.push('/');
        }
      }); 
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={(e)=>{handel(e)}}/>
          <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={(e)=>{handel(e)}}/>
          <Button  style={{textTransform: 'lowercase', fontSize:18}} variant="contained" type="submit" fullWidth  color="primary" className={classes.submit} onClick={(e) => { e.preventDefault();handleLogin(data);}}>
            Sign in
          </Button>
          <Box alignItems='strech'>
          <GoogleLogin clientId={'yourClientId'} buttonText="Sign in with Google"
              onSuccess={(res)=>{handleLoginWithGoogle(res)}}
              onFailure={(res) => { console.log(res);}}
              cookiePolicy={'single_host_origin'}/>
          </Box>

          <Grid container style={{marginTop:20 ,alignItems:'center'}}>
            <Grid item xs>
              <Link href="/ForgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}