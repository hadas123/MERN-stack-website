import React, { useState,useEffect } from 'react';
import {Grid,Card,CardContent,CardMedia,Button,TextField} from "@material-ui/core"
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BingMapsReact from "bingmaps-react";
import { Deliverers } from './miniComponents/deliverers';
import { Orders } from './miniComponents/orders';
import {GetOrders} from '../../../../httpRequests/administrator/orders';
import {GetDeliverers} from '../../../../httpRequests/administrator/users';
import {GetDistributionProposal,SetDistributionProposal} from '../../../../httpRequests/administrator/orders';



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



  var stringToColour = function(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }
 







export function SetDelivererForOrder() {
    const classes = useStyles();
    const history = useHistory();
    const [orders,setOrders]=useState([]);
    const [filterOrders,setFilterOrders]=useState([]);
    const [deliverers,setDeliverers]=useState([]);
    const [filterDeliverers,setFilterDeliverers]=useState([]);
    const [city,setCity]=useState('');
    const [date,setDate]=useState(Date.now());
    const [pushPin,setPushPin]=useState([]);

    function handleChangeCity(city){
      setCity(city);
      setFilterDeliverers(deliverers.filter(d=>((d?.address?.city).startsWith(city))));
     setFilterOrders(orders.filter(o=>((o?.address?.city).startsWith(city))));
    }
    function handleChangeDate(date){
      setDate(date);
    }
    function GetProposal(){
      GetDistributionProposal(filterOrders.filter(o=>o.slected),filterDeliverers.filter(d=>d.selected)).
      then((res)=>{
        let pins=[];
        res.forEach(e=>{
          pins.push({
            center: { 
              latitude:parseFloat(e.order.position.lat), 
              longitude:parseFloat(e.order.position.lng) 
            },
            options:{
              text:e?.deliverer?.userName, 
              color:stringToColour(e?.deliverer?.userName)
            }
          });      
        });
        setPushPin(pins);  
      });
    }

    function updateOnServer(){
        SetDistributionProposal(date,filterOrders.filter(o=>o.slected),filterDeliverers.filter(d=>d.selected)).then((res)=>{
          if(res)history.push('/administrator/orders/viewAllOrders');
        });
    }


    useEffect(()=>{
      GetOrders().then((res)=>{
        setOrders(res.filter(order=>order?.status[0]==='new'));
        setFilterOrders(res.filter(order=>order?.status[0]==='new'));
   
      });
      GetDeliverers().then((res)=>{
        setDeliverers(res);
        setFilterDeliverers(res);
      });
      
    },[]);
    
    
    
    return(
        <React.Fragment>
        <Grid container >
            <Grid item   xs={12} sm={5} md={400}>
              <BingMapsReact height="600px" bingMapsKey="AvG3lm0uBxP3jvBALkFo84FE4derUEbR-tw6dRxSKfe1J16kw3n7GOLDFsu9cF2I" 
                  viewOptions={{center: { latitude: 31.7, longitude: 35.2 },zoom:8}}
                  pushPinsWithInfoboxes = {pushPin}/>
            </Grid>
            <Grid item sm={7}>
              <Grid container style={{algin:"center", marginBottom:10}}>   
                <Grid item >
                  <TextField id="date"  style={{marginLeft:60,width: 200}} label="Expected Deliver Date"  InputLabelProps={{shrink: true}} type="date" defaultValue={date} onChange={(e)=>{e.preventDefault();handleChangeDate(e.target.value);}}/>
                </Grid>
                <Grid item >
                  <TextField id="city"  style={{marginLeft:60,width: 200}} label="City"  InputLabelProps={{shrink: true}} value={city} onChange={(e)=>{e.preventDefault();handleChangeCity(e.target.value);}}/>
                </Grid>
              </Grid>
            <Grid container>
                    <Grid item sm={6} >
                        <Card >
                          <CardMedia>
                            <Typography variant="h5" align="center" color="Primary" gutterBottom>Orders</Typography>
                          </CardMedia>
                          <CardContent style={{height: 460, overflow:'auto'}}>
                            <Orders Orders={filterOrders} onGetProposal={GetProposal}/>
                          </CardContent>
                       </Card>
                    </Grid>
                    <Grid item sm={6}>
                    <Card >
                        <CardMedia>
                          <Typography variant="h5" align="center" color="Primary" gutterBottom>Deliverers</Typography>
                        </CardMedia>
                        <CardContent style={{height: 460, overflow:'auto'}}>
                          <Deliverers Deliverers={filterDeliverers} onGetProposal={GetProposal}/>
                        </CardContent>
                    </Card>

                    </Grid>
                </Grid>
                <Grid item>
                    <Button onClick={updateOnServer} color="primary" align="center">update</Button>
                </Grid> 
            </Grid>          
        </Grid>
        </React.Fragment>
    );   
   }