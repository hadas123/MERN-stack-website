import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import {logoutInServer} from '../../httpRequests/auth';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import actionCreators from '../../state/action-creators';
import PersonIcon from '@material-ui/icons/Person';
import {useHistory} from 'react-router-dom'
import {LoginLocally,LoginWithGoogle,IsLogedIn} from '../../httpRequests/auth';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const drawerWidth=240;

const useStyles = makeStyles((theme) => ({
appBar: {
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
},
appBarShift: {
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
},
menuButton: {
  marginRight: 36,
},
IconSpace: {
  marginRight: 5,
},
hide: {
  display: 'none',
}
}));


export  function Bar(props){
  let {IsMenuOpen, onOpen}=props;
  const islogin=useSelector((state)=>state.login);
  const history = useHistory();
  const dispach=useDispatch();
  const {logout,setRoleToGuest}=bindActionCreators(actionCreators,dispach);
  const classes = useStyles();

  
  
  return(
        <>
        <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: IsMenuOpen, })}>  
          <Toolbar >     
            <IconButton color="inherit" aria-label="open drawer" onClick={onOpen} edge="start" className={clsx(classes.menuButton, {[classes.hide]: IsMenuOpen})}>
              <MenuIcon />
            </IconButton>
            <Typography   variant="h6" noWrap style={{ flex: 1 }}>
              <Box display="flex" alignItems="center">
                <span className={classes.IconSpace} >DeliverIt</span>
                <LocalShippingOutlinedIcon style={{ fontSize: 40 }}/>
             </Box>
            </Typography>

            {islogin && (
              <React.Fragment>
          <div> 
          <IconButton color="inherit" onClick={function handleHome(){
            history.push('/');
          }}>
          <Typography style={{fontSize:15}}>Home</Typography>
          <HomeOutlinedIcon/>
          </IconButton>
          </div>

          <div> 
          <IconButton color="inherit" onClick={function handleLogOut(){
            logoutInServer().then((isLogOut)=>{
              if(isLogOut){logout();setRoleToGuest();localStorage.removeItem('user');}
              history.push('/signIn');
            });
          }}>
          <Typography style={{fontSize:15}}>Log Out</Typography>
          <LockOutlinedIcon/>
          </IconButton>
          </div>
          </React.Fragment>
          )}

            {(!islogin) &&
             <div> 
            <IconButton component={Link} to="/signIn" color="inherit" >
            <Typography style={{fontSize:15}}>Sign In</Typography>
            <LockOpenOutlinedIcon/>
            </IconButton>
          </div>
           
        }


         </Toolbar>
        </AppBar>
      </>
    );
}

