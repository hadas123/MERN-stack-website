import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import {getProfile} from '../../../../httpRequests/profile';
import { useEffect, useState } from 'react';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
   }
}));

export  function ProfileInfoWithoutImageAndAddress(props) {
  const [user,setUser]=useState({urlImage:'',userName:'',firstName:'',lastName:'',phoneNumber:'',email:'',address:{city:'',street:'',building:''}}); 
  const history = useHistory();
  const classes = useStyles();
  useEffect(()=>{getProfile(props.userId).then((res)=>{setUser(res);})},[]);
  return (
    <div style={{flexDirection: 'column'}} >  
            <div >
            <Grid >
                <Grid style={{display: 'flex',  justifyContent:'left', alignItems:'left'}} item xs={12}>
                    <Typography  variant="h9">{user.firstName+" "+user.lastName}</Typography>
                </Grid>
                <Grid  style={{display: 'flex',  justifyContent:'left', alignItems:'left'}} item xs={12} sm={20}>
                  {(user.email)&&
                    <Typography  variant="h9">{<>{user.email}</>}</Typography>
                  }
                  </Grid>
                  <Grid style={{display: 'flex',  justifyContent:'left', alignItems:'left'}} item xs={12} sm={20}>
                  {(user.phoneNumber)&&
                    <Typography  variant="h9">{<>{user.phoneNumber}</>}</Typography>
                  }
                  </Grid>
          </Grid>
          </div>
   
    </div>
  );
}