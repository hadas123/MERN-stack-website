import React,{useEffect,useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Product } from './miniComponents/Product';
import {GetOrder, GetProducts,updateOrder} from '../../../httpRequests/customer/orders';
import {Cart} from './miniComponents/Cart';
import {useHistory,useLocation} from 'react-router-dom';
import { addOrder } from '../../../httpRequests/customer/orders';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
 
}
}));



export  function UpdateOrder() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const state=useSelector((state)=>state);
  const [products,setProducts]=useState([]);
  const [order,setOrder]=useState([]);
  const [orderNumber,setOrderNumber]=useState('');

  useEffect(() => {
    GetProducts().then((GetProductsRes)=>{
        GetOrder(state.user._id,location.state.orderNumber).then((GetOrderRes)=>{     
            setOrderNumber(GetOrderRes.order._id);
            setOrder( GetOrderRes.order.productList);
            GetProductsRes.forEach(product => {
                product.amount=0;
            });
            GetProductsRes.forEach(p => {
                GetOrderRes.order.productList.forEach(op => {
                    if(op._id===p._id){
                        p.amount=op.amount;
                    }
                });
            });
           
            setProducts(GetProductsRes);
        });
      });
  },[]);

 function handelAdd(p) {
    let newProducts=[...products];
    newProducts.forEach(element => {
        if(element._id===p._id){element.amount=element.amount+1;}
    });
    setProducts(newProducts);
    setOrder( ([...products].filter(po=>(po.amount!==0))));
}

function handelRemove(p) {
    let newProducts=[...products];
    newProducts.forEach(element => {
        if(element._id===p._id){
            if(element.amount!==0){element.amount=element.amount-1;}
        }    
    });
    setProducts(newProducts);
    setOrder( ([...products].filter(po=>(po.amount!==0))));
}

function handelUpdateOrder() {
    updateOrder({productList:order,orderNumber:orderNumber,customerId:state.user._id,address:state.user.address}).then((isAdded)=>{
        history.push('/customer/orders/watch');
    });
}

  return (
    <React.Fragment>
              <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="Primary" gutterBottom>
              products
            </Typography>
           </Container>
        </div>
        
     <Grid container column>
         <Grid item  md={3}>
             <Cart order={order} onAdd={handelAdd} onRemove={handelRemove} onFinishOrder={handelUpdateOrder} buttonTitle={'update order'}/>
              </Grid>
         <Grid item md={9}>

         <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <Product name={product.name} urlImage={product.urlImage} onAdd={()=>{handelAdd(product);}} onRemove={()=>{handelRemove(product);}}/>
                </Grid>
            ))}
          </Grid>
        </Container>
         </Grid>
     </Grid>
   
    </React.Fragment>
  );
}