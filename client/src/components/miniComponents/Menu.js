import React from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import BallotOutlinedIcon from '@material-ui/icons/BallotOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';

const drawerWidth=240;
const useStyles = makeStyles((theme) => ({
    
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
      },
      drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
      }
}));



export function Menu(props){
    let {IsMenuOpen, onClose}=props;
    const history = useHistory();
    const role=useSelector((state)=>state.role);
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: IsMenuOpen,
          [classes.drawerClose]: !IsMenuOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: IsMenuOpen,
            [classes.drawerClose]: !IsMenuOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={onClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
      
        {(role==="administrator")&& <List>{[
          {text:'profile', goTo:"/profile",icon:<AccountCircleOutlinedIcon />},
          {text:'orders',goTo:"/administrator/orders/viewAllOrders",icon:<LocalMallOutlinedIcon />},
          // {text:'products',goTo:"/administrator/products",icon:<ShoppingBasketOutlinedIcon />},
          {text:'users',goTo:"/administrator/users/view",icon:<GroupOutlinedIcon />},
          {text:'chat',goTo:"/chat",icon:<SmsOutlinedIcon />},
          {text:'blog',goTo:"/administrator/blog",icon:<BallotOutlinedIcon />}
          ].map((item, index) => (
            <ListItem button onClick={()=>{history.push(item.goTo)}} key={item.text}> 
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem> ))}
      </List>}
        {(role==="deliverer")&& <List>{[
          {text:'profile', goTo:"/profile",icon:<AccountCircleOutlinedIcon />},
          {text:'orders',goTo:"/deliverer/orders/view",icon:<LocalMallOutlinedIcon />},
          {text:'chat',goTo:"/chat",icon:<SmsOutlinedIcon />},
          {text:'blog',goTo:"/deliverer/blog",icon:<BallotOutlinedIcon />}
          ].map((item, index) => (
            <ListItem button onClick={()=>{history.push(item.goTo)}} key={item.text}> 
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem> ))}
      </List>}
      
      
        {(role==="customer")&&<List>{[
          {text:'profile', goTo:"/profile",icon:<AccountCircleOutlinedIcon />},
          {text:'watch orders',goTo:"/customer/orders/watch",icon:<LocalMallOutlinedIcon />},
          {text:'chat',goTo:"/chat",icon:<SmsOutlinedIcon />}
        ].map((item, index) => (
            <ListItem button onClick={()=>{history.push(item.goTo)}} key={item.text}> 
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem> ))}
           
      </List>}
        {(role==="guest")&& <List>{[].map((item, index) => (
            <ListItem button onClick={()=>{history.push(item.goTo)}} key={item.text}> 
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem> ))}
      </List>}
      </Drawer>
    );
}