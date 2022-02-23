import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {CardContent} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {getProfile} from '../../../httpRequests/profile';
import { useEffect, useState } from 'react';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
   },
  avatar: {
    height: theme.spacing(20),
    width: theme.spacing(20), 
    alignItems: 'center'
    
  }
}));

export  function Profile() {
  const state=useSelector((state)=>state);
  const [user,setUser]=useState({
    urlImage:'',userName:'',firstName:'',lastName:'',
    phoneNumber:'',email:'',address:{city:'',street:'',building:0}
  }); 

  useEffect(()=>{getProfile(state.user._id).then((res)=>{setUser(res);})},[]);
  const history = useHistory();
  const classes = useStyles();
  return (
    <Card style={{width:'60%',height:'90%',marginTop:{spacing:20},margin:'auto',flexDirection: 'column'}} >
      <CardContent className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <img width="100%" src={user.urlImage}/>
                </Avatar>
                </CardContent>
            <div >
            <Typography variant="h3" color="primary">{user.userName}</Typography>
            <Grid >
                <Grid alignItems="left" item xs={12}>
                    <Typography color="primary" variant="h5">{user.firstName+" "+user.lastName}</Typography>
                </Grid>
                <Grid alignItems="left" item xs={12} sm={20}>
                  {(user.phoneNumber)&&(user.email)&&
                    <Typography color="primary" variant="h7">{<>{user.phoneNumber} {" | "} {user.email}</>}</Typography>
                  }
                  {(!user.phoneNumber)&&(user.email)&&
                    <Typography color="primary" variant="h7">{<>{user.email}</>}</Typography>
                  }
                  {(user.phoneNumber)&&(!user.email)&&
                    <Typography color="primary" variant="h7">{<>{user.phoneNumber}</>}</Typography>
                  }
                  </Grid>
                <Grid alignItems="left" item xs={12} sm={20}>
                  {(user.address)&&
                    <Typography color="primary" variant="h7">{user.address?.street+" "+user.address?.building+", "+user.address?.city}</Typography>
                  }
                
                </Grid>
          </Grid>
          </div>
       <CardActions>
       <IconButton style={{marginLeft:25}} color="primary" onClick={(e)=>{e.preventDefault();history.push('profile/edit');}}aria-label="update" >
          <EditOutlinedIcon style={{fontSize:30}}/>
      </IconButton>
      </CardActions>   
    </Card>
  );
}