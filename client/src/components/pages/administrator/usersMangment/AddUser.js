import  { useState,useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Radio,Grid,TextField,Avatar,Button,Typography,RadioGroup,FormControlLabel} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {AddUserInServer} from '../../../../httpRequests/administrator/users';
import {ErrorAlert} from '../../../miniComponents/alert';
var validator = require('validator');

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


export function AddUser() {
    const history = useHistory();
    const classes = useStyles();
    const [image, setImage] = useState("https://image.flaticon.com/icons/png/256/747/747376.png")
    const [imageFile,SetImageFile]=useState('');
    const [data,setData]=useState({firstName:'',lastName:'',userName:'',phoneNumber:'', email:'',city:'', street:'',building:'0',role:'customer'});
    const [alert,setAlert]=useState(true);
    const [errorData,setErrorData]=useState('');
    const [errorEmail,setErrorEmail]=useState({error:false,msg:''});
    const [errorPhoneNum,setErrorPhoneNum]=useState({error:false,msg:''});
    const [errorBuilding,setErrorBuilding]=useState({error:false,msg:''});
    const [errorCity,setErrorCity]=useState({error:false,msg:''});
    const [errorStreet,setErrorStreet]=useState({error:false,msg:''});


    const handel=(e)=>{
      const nweData={...data};
      nweData[e.target.id]=e.target.value;
      setData(nweData);
    };

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

    function handleAddUser(data,imageFile){ 
      if(validateData()){
        (AddUserInServer(data,imageFile)).then((res)=>{
          if(res.isAdded){history.push('/administrator/users/view');}
          else {setAlert(false); setErrorData(res.error);}
        });
      }
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
          <div className={classes.paper}>
            <Avatar onClick={()=>{inputFileRef.current.click();}} className={classes.avatar}>
              <img width="100%" src={image}/>  
            </Avatar>
            <Typography component="h1" variant="h5">
              Add User
            </Typography>
            <ErrorAlert disable={alert} errorMsg={errorData} />           
            <form onSubmit={(e)=>{e.preventDefault(); handleAddUser(data,imageFile);}} enctype="multipart/form-data" className={classes.form} noValidate>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <input type="file" name='image' ref={inputFileRef} style={{display:"none"}} onChange={onImageChange} accept="image/*" />
                      <TextField autoComplete="userName" name="userName" variant="outlined" required fullWidth id="userName" label="user name" autoFocus onChange={(e)=>{handel(e)}}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField autoComplete="fname" name="firstName" variant="outlined" required fullWidth id="firstName" label="First Name" autoFocus onChange={(e)=>{handel(e)}}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField variant="outlined" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lname" onChange={(e)=>{handel(e)}}/>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField variant="outlined" required error={errorEmail.error} helperText={errorEmail.msg} fullWidth id="email" label="Email" name="email" autoComplete="email" onChange={(e)=>{handel(e)}}/>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField variant="outlined" required error={errorPhoneNum.error} helperText={errorPhoneNum.msg} fullWidth id="phoneNumber" label="phone number" name="phoneNumber" autoComplete="phone" onChange={(e)=>{handel(e)}}/>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                      <TextField variant="outlined" required error={errorCity.error} helperText={errorCity.msg} fullWidth id="city" label="city" name="city" autoComplete="city" onChange={(e)=>{handel(e)}}/>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                      <TextField variant="outlined" required error={errorStreet.error} helperText={errorStreet.msg} fullWidth id="street" label="street" name="steet" autoComplete="street" onChange={(e)=>{handel(e)}}/>
                 </Grid>  
                 <Grid item xs={12} sm={4}>
                     <TextField variant="outlined" required error={errorBuilding.error} helperText={errorBuilding.msg} fullWidth id="building" label="building" name="building" autoComplete="building" onChange={(e)=>{handel(e)}}/>
                  </Grid>         
            </Grid >
            <RadioGroup style={{marginLeft:110, marginTop:20}} row onChange={(e)=>{handel(e)}} id="role" name="role" defaultValue={'customer'}>
                <FormControlLabel  value="customer"  control={<Radio id="role" color="primary"/>} label="Customer" />
                <FormControlLabel  value='deliverer' control={<Radio id="role" color="primary"/>} label='Deliverer' />
            </RadioGroup>
            <Button style={{textTransform: 'lowercase',fontSize:18}} type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >Add User</Button>    
            </form>
          </div>
         
        </Container>
      );  
   }