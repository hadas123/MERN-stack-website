import React, { useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter,Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import {Bar} from './components/miniComponents/Bar'
import {Menu} from './components/miniComponents/Menu'

import {SignUp} from './components/pages/auth/SignUp'
import {SignIn} from './components/pages/auth/SignIn'
import {ForgotPassword} from './components/pages/auth/ForgotPassword'
import {ResetPassword} from './components/pages/auth/ResetPassword'
import {Profile} from './components/pages/profile/profile';
import {EditProfile} from './components/pages/profile/EditProfile';

import {CustomerOrders} from './components/pages/customer/CustomerOrders';
import {CreateOrder} from './components/pages/customer/CreateOrder';
import {ViewOrders} from './components/pages/customer/ViewOrder';
import {UpdateOrder} from './components/pages/customer/UpdateOrder';


import {ChartOrders} from './components/pages/administrator/ordersMangment/chartOrders';
import {SetDelivererForOrder} from './components/pages/administrator/ordersMangment/setDelivererForOrder';
import {ViewOrderInfo} from './components/pages/administrator/ordersMangment/viewOrderInfo';
import {ViewOrdersByAdministrator} from './components/pages/administrator/ordersMangment/viewOrdersByAdministrator';
import {AddUser} from './components/pages/administrator/usersMangment/AddUser';
import {ChartUsers} from './components/pages/administrator/usersMangment/chartUsers';
import {UpdateUser} from './components/pages/administrator/usersMangment/updateUser';
import {ViewUsers} from './components/pages/administrator/usersMangment/viewUsers';
import {ViewUserInfo} from './components/pages/administrator/usersMangment/viewUser';
import {ViewOnMapByDeliverer} from './components/pages/deliverer/viewOnMap';
import {ViewOrdersByDeliverer} from'./components/pages/deliverer/viewOrdersByDeliverer';
import {ViewOrdersOnMapByAdministrator} from'./components/pages/administrator/ordersMangment/viewOrdersOnMapByAdministrator';

import { Chat } from './components/pages/chat/chat';
import {ViewBlogByAdmin} from './components/pages/Blog/ViewBlogByAdmin';
import {ViewBlogByDeliverer} from './components/pages/Blog/ViewBlogByDeliverer';
import {AddPost} from './components/pages/Blog/AddPost';





const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


function App() {
  const classes = useStyles();
  const islogin=useSelector((state)=>state.login);
  const role=useSelector((state)=>state.role);
  const user=useSelector((state)=>state.user);
  const state=useSelector((state)=>state);
  const [open, setOpen] = React.useState(false);
  const handleMenuOpen = () => { setOpen(true);};
  const handleMenuClose = () => {setOpen(false);};


 
  return (
    <BrowserRouter>
    <div className="App">
      <div className={classes.root}>
        <Bar IsMenuOpen={open} onOpen={handleMenuOpen}  />
        <Menu IsMenuOpen={open}  onClose={handleMenuClose}/>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          
          <Route path="/" exact strict  >{(islogin)?(<div><h1><i>Deliver It</i></h1><img height={600} src="http://localhost:3000/delivery.png"/></div>):(<Redirect to="/signIn" />)} </Route> 
          <Route path="/signIn" exact strict >{(!islogin)?(<SignIn/>):(<Redirect to="/" />)}</Route>
          {/* <Route path="/signUp" exact strict>{(!islogin)?(<SignUp/>):(<Redirect to="/" />)}</Route>    */}
          <Route path="/ForgotPassword" exact strict>{(!islogin)?(<ForgotPassword/>):(<Redirect to="/" />)}</Route>  
          <Route path="/ResetPassword" exact strict>{(!islogin)?(<ResetPassword/>):(<Redirect to="/" />)}</Route> 
          <Route path="/profile" exact strict>{(islogin)?(<Profile/>):(<Redirect to="/signIn" />)}</Route>
          <Route path="/profile/edit" exact strict>{(islogin)?(<EditProfile/>):(<Redirect to="/signIn" />)}</Route>
          <Route path="/chat" exact strict>{(islogin)?(<Chat/>):(<Redirect to="/signIn" />)}</Route>


          <Route path="/customer/order/add" exact strict>{(islogin)?(<CreateOrder/>):(<Redirect to="/signIn" />)}</Route>
          <Route path="/customer/orders/watch" exact strict>{(islogin)?(<CustomerOrders/>):(<Redirect to="/signIn" />)}</Route>
          <Route path="/customer/order/view" exact strict>{(islogin)?(<ViewOrders/>):(<Redirect to="/signIn" />)}</Route>
          <Route path="/customer/order/update" exact strict>{(islogin)?(<UpdateOrder/>):(<Redirect to="/signIn" />)}</Route>
          
          
          <Route path="/administrator/orders/viewAllOrders" exact strict>{(islogin)?(<ViewOrdersByAdministrator/>):(<Redirect to="/signIn" />)}</Route>
          <Route path="/administrator/orders/viewOrderInfo" exact strict>{(islogin)?(<ViewOrderInfo/>):(<Redirect to="/signIn" />)}</Route>
          <Route path="/administrator/orders/charts" exact strict>{(islogin)?(<ChartOrders/>):(<Redirect to="/signIn" />)}</Route>
          <Route path="/administrator/orders/setDeliverersForOrders" exact strict>{(islogin)?(<SetDelivererForOrder/>):(<Redirect to="/signIn" />)}</Route>
          <Route path="/administrator/orders/viewOnMap" exact strict>{(islogin)?(<ViewOrdersOnMapByAdministrator/>):(<Redirect to="/signIn" />)}</Route>


          <Route path="/administrator/users/view" exact strict>{(islogin)?(<ViewUsers/>):(<Redirect to="/signIn" />)}</Route>
          <Route path="/administrator/users/viewUserInfo" exact strict>{(islogin)?(<ViewUserInfo/>):(<Redirect to="/signIn" />)}</Route>
          <Route path="/administrator/users/add" exact strict>{(islogin)?(<AddUser/>):(<Redirect to="/signIn" />)}</Route>
          {/* <Route path="/administrator/users/update" exact strict>{(islogin)?(<UpdateUser/>):(<Redirect to="/signIn" />)}</Route> */}
           {/* <Route path="/administrator/users/delete" exact strict>{(islogin)?(<h1>delete</h1>):(<Redirect to="/signIn" />)}</Route>  */}
          <Route path="/administrator/users/charts" exact strict>{(islogin)?(<ChartUsers/>):(<Redirect to="/signIn" />)}</Route>
          <Route path="/administrator/blog" exact strict>{(islogin)?(<ViewBlogByAdmin/>):(<Redirect to="/signIn" />)}</Route>
          <Route path="/administrator/blog/addPost" exact strict>{(islogin)?(<AddPost/>):(<Redirect to="/signIn" />)}</Route>




          <Route path="/deliverer/orders/view" exact strict>{(islogin)?(<ViewOrdersByDeliverer/>):(<Redirect to="/signIn" />)}</Route>
          <Route path="/deliverer/orders/viewOnMap" exact strict>{(islogin)?(<ViewOnMapByDeliverer/>):(<Redirect to="/signIn" />)}</Route>
          <Route path='/deliverer/blog' exact strict>{(islogin)?(<ViewBlogByDeliverer/>):(<Redirect to="/signIn" />)}</Route>


        </main>
      
      </div>  
    </div>
    </BrowserRouter>
  );
}

export default App;
