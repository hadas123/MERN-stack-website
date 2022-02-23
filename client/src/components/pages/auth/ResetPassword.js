import React from 'react';
import  { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';
import {ResetPasswordInserver} from '../../../httpRequests/auth';
import {useHistory} from 'react-router-dom';
import {Timer} from './miniComponents/timer';

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

export  function ResetPassword() {
  const history = useHistory();
  const classes = useStyles();
  const [data,setData]=useState({password:'' , email:'',code:''});
  const [disableButton,SetDisableButton]=useState(false);
  const handelChange=(e)=>{
    const nweData={...data};
    nweData[e.target.id]=e.target.value;
    setData(nweData);
  };
  function handleReset(data){
    (ResetPasswordInserver(data)).then(()=>{history.push('/signIn');});
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Box height="2" alignItems="center">
        <Timer onFinish={()=>{SetDisableButton(true)}}/>
        </Box>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e)=>{handelChange(e)}} />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="code"
            label="Reset Code"
            name="code"
            autoComplete="code"
            autoFocus
            onChange={(e)=>{handelChange(e)}} />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>{handelChange(e)}}
          />
           <Button 
            disabled={disableButton}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => { e.preventDefault();handleReset(data);}} >
            Reset Password
          </Button>
          <Box alignItems='strech'>
      
          </Box>
       </form>
      </div>
    </Container>
  );
}