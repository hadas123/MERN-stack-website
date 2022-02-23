import React, {useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {EditProfileInServer} from '../../../httpRequests/profile';
import {ErrorAlert} from '../../miniComponents/alert';
var validator = require('validator');


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
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

export  function EditProfile() {
  const user=useSelector((state)=>state.user); 
  const history = useHistory();
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState(user.urlImage);
  const [imageFile,SetImageFile]=useState('');
  const inputFileRef = useRef( null );
  const [data,setData]=useState({
    firstName:user.firstName,lastName:user.lastName,
    phoneNumber:user.phoneNumber, email:user.email,   
    city:user.address?.city, street:user.address?.street,building:String(user.address?.building)   
  });
  const [alert,setAlert]=useState(true);
  const [errorData,setErrorData]=useState('');
  const [errorEmail,setErrorEmail]=useState({error:false,msg:''});
  const [errorPhoneNum,setErrorPhoneNum]=useState({error:false,msg:''});
  const [errorBuilding,setErrorBuilding]=useState({error:false,msg:''});
  const [errorCity,setErrorCity]=useState({error:false,msg:''});
  const [errorStreet,setErrorStreet]=useState({error:false,msg:''});

  
  const handel=(e)=>{
    let nweData={...data};
    nweData[e.target.id]=e.target.value;
    setData(nweData);
  }

  function validateData(){
    var valid=true;
    if(!validator.isEmail(data.email)){
      valid=false;
      setErrorEmail({error:true,msg:'incorrect email'});
    }else{ setErrorEmail({error:false,msg:''});}

    if(!validator.isMobilePhone(data.phoneNumber)){
      valid=false;
      setErrorPhoneNum({error:true,msg:'incorrect phone number'});
    }else{setErrorPhoneNum({error:false,msg:''});}

    if(!validator.isNumeric(data.building)){
      valid=false;
      setErrorBuilding({error:true,msg:'incorrect building'});
    }else{setErrorBuilding({error:false,msg:''});}


    if(data.city.split(" ").every((word)=>{return validator.isAlpha(word);})){
      setErrorCity({error:false,msg:''});     
    }else{
      valid=false;
      setErrorCity({error:true,msg:'incorrect city'});
    }


    if(data.street.split(" ").every((word)=>{return validator.isAlpha(word);})){
      setErrorStreet({error:false,msg:''});     
    }else{
      valid=false;
      setErrorStreet({error:true,msg:'incorrect street'});
    }

   
    return valid;
  }

  function handleUpdateProfile(data){
    if(validateData()){
    EditProfileInServer(data,imageFile,user._id).then((res)=>{
      if(res.isEdited){
        history.push('/profile');
        window.location.reload();
      }
      else {setAlert(false); setErrorData(res.error);}
    });
  }
  }
 

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      {setImageUrl(URL.createObjectURL(event.target.files[0]));
       SetImageFile(event.target.files[0]);
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar onClick={()=>{inputFileRef.current.click();}} className={classes.avatar}>
          <img width="100%" src={imageUrl}/>
          <input type="file"  ref={inputFileRef} style={{display:"none"}} onChange={onImageChange} accept="image/*" />
        </Avatar>
        <ErrorAlert disable={alert} errorMsg={errorData} />  
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <TextField value={data.firstName} autoComplete="fname" name="firstName" variant="outlined" required fullWidth id="firstName" label="First Name" autoFocus onChange={(e)=>{handel(e)}}/>
            </Grid>
          <Grid item xs={12} sm={6}>
              <TextField value={data.lastName} variant="outlined" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lname" onChange={(e)=>{handel(e)}}/>
            </Grid>
          <Grid item xs={12}>
              <TextField value={data.email} variant="outlined" required error={errorEmail.error} helperText={errorEmail.msg} fullWidth id="email" label="Email" name="email" autoComplete="email" onChange={(e)=>{handel(e)}}/>
            </Grid>
          <Grid item xs={12}>
              <TextField value={data.phoneNumber} variant="outlined" required error={errorPhoneNum.error} helperText={errorPhoneNum.msg} fullWidth id="phoneNumber" label="phone number" name="phoneNumber" autoComplete="phone Number" onChange={(e)=>{handel(e)}}/>
            </Grid>
          <Grid item xs={12} sm={4}>
              <TextField value={data.city} variant="outlined" required error={errorCity.error} helperText={errorCity.msg} fullWidth id="city" label="city" name="city" autoComplete="city" onChange={(e)=>{handel(e)}}/>
            </Grid>
          <Grid item xs={12} sm={4}>
              <TextField value={data.street} variant="outlined" required error={errorStreet.error} helperText={errorStreet.msg} fullWidth id="street" label="street" name="steet" autoComplete="street" onChange={(e)=>{handel(e)}}/>
            </Grid>  
          <Grid item xs={12} sm={4}>
                <TextField value={data.building} variant="outlined" required error={errorBuilding.error} helperText={errorBuilding.msg} fullWidth id="building" label="building" name="building" autoComplete="building" onChange={(e)=>{handel(e)}}/>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth style={{textTransform: 'lowercase'}} variant="contained" color="primary" className={classes.submit} onClick={(e)=>{e.preventDefault(); handleUpdateProfile(data);}}>
            Update
          </Button>

        </form>
      </div>
     
    </Container>
  );
}