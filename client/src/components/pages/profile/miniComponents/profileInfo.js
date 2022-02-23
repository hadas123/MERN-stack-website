import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import {getProfile} from '../../../../httpRequests/profile';
import { useEffect, useState } from 'react';
const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(2),
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center'
   },
  avatar: {
    height: theme.spacing(5),
    width: theme.spacing(5), 
    marginLeft:theme.spacing(2),
   // marginRight:theme.spacing(5),
    marginTop:theme.spacing(2),
    //alignItems: 'center'
    
  }
}));

export  function ProfileInfo(props) {
  const [user,setUser]=useState({urlImage:'',userName:'',firstName:'',lastName:'',phoneNumber:'',email:'',address:{city:'',street:'',building:''}}); 
  const history = useHistory();
  const classes = useStyles();
  useEffect(()=>{getProfile(props.userId).then((res)=>{setUser(res);})},[]);
  return (
   
      <Grid container >
               <Grid item sm={5}>
                <Avatar  className={classes.avatar}>
                    <img width="100%" src={user?.urlImage}/>
                </Avatar>
                </Grid>  
            <Grid item  align="left" sm={7}>
            <Typography variant="h5" >{user?.userName}</Typography>
            <Grid >
                <Grid align="left" item xs={12}>
                    <Typography  variant="h7">{user?.firstName+" "+user?.lastName}</Typography>
                </Grid>
               
                  <Grid align="left" item xs={12} sm={20}>
                  {(user?.phoneNumber)&&
                    <Typography  variant="h9">{<>{user?.phoneNumber}</>}</Typography>
                  }
                  </Grid>
                  <Grid align="left" item xs={12} sm={20}>
                  {(user?.email)&&
                    <Typography  variant="h9">{<>{user?.email}</>}</Typography>
                  }
                  </Grid>
                <Grid align="left" item xs={12} sm={20}>
                  {(user?.address)&&
                    <Typography  variant="h9">{user?.address?.street+" "+user?.address?.building+", "+user?.address?.city}</Typography>
                  }
                
                </Grid>
          </Grid>
          </Grid>
          </Grid>

  );
}