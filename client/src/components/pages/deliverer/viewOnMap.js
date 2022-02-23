import React, { useState,useEffect } from 'react';
import {Grid,Card,CardContent,CardMedia,TextField,Typography} from "@material-ui/core"
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BingMapsReact from "bingmaps-react";
import { useSelector } from 'react-redux';
import { Orders } from './miniComponents/orders';
import {GetOrders} from '../../../httpRequests/deliverer/orders';



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




export function ViewOnMapByDeliverer() {
    const classes = useStyles();
    const history = useHistory();
    const state=useSelector((state)=>state);
    const [orders,setOrders]=useState([]);
    const [filterOrders,setFilterOrders]=useState([]);
    const [date,setDate]=useState(new Date().toISOString().split('T')[0]);
    const [pushPin,setPushPin]=useState([]);
    function handleChangeDate(date){
        setDate(date);
        setFilterOrders(orders.filter(order=>order?.ExpectedDeliverDate.split('T')[0]===date));
        
        let pins=orders.filter(order=>order?.ExpectedDeliverDate.split('T')[0]===date).map((e,index)=>(
            {
                center: { 
                  latitude:parseFloat(e?.position?.lat), 
                  longitude:parseFloat(e?.position?.lng) 
                },
                options:{
                  text:String(index+1), 
                  color:(e.status[0]==='delivered')?'gray':'green'
                }
            }
        ));
        setPushPin(pins);
    }
   

   


    useEffect(()=>{
      GetOrders(state.user._id).then((res)=>{
        setOrders(res);
        setFilterOrders(res.filter(order=>order?.ExpectedDeliverDate.split('T')[0]===date));
        let pins=res.filter(order=>order?.ExpectedDeliverDate.split('T')[0]===date).map((e,index)=>(
            {
                center: { 
                  latitude:parseFloat(e?.position?.lat), 
                  longitude:parseFloat(e?.position?.lng) 
                },
                options:{
                  text:String(index+1), 
                  color:(e.status[0]==='delivered')?'gray':'green'
                }
              }           
        ));

        setPushPin(pins);
      });  
    },[]);
    
    
    
    return(
        <React.Fragment>
        <Grid container >
            <Grid item   xs={12} sm={8} md={400}>
              <BingMapsReact height="600px" bingMapsKey="your bing key" 
                  viewOptions={{center: { latitude: 31.7, longitude: 35.2 },zoom:8}}
                  pushPinsWithInfoboxes = {pushPin}/>
            </Grid>
            <Grid item sm={4}>
              <Grid  style={{algin:"center", marginBottom:10}}>   
                <Grid item >
                  <TextField id="date"  style={{marginLeft:60,width: 200}} label="Expected Deliver Date"  InputLabelProps={{shrink: true}} type="date" defaultValue={date} onChange={(e)=>{e.preventDefault();handleChangeDate(e.target.value);}}/>
                </Grid>
               
              </Grid>
            <Grid >
                        <Card >
                          <CardMedia>
                            <Typography variant="h5" align="center" color="Primary" gutterBottom>Orders</Typography>
                          </CardMedia>
                          <CardContent style={{height: 500, overflow:'auto'}}>
                            <Orders Orders={filterOrders} onGetProposal={()=>{}}/>
                          </CardContent>
                       </Card>
                </Grid>
            </Grid>          
        </Grid>
        </React.Fragment>
    );   
   }