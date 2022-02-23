import React, { useState,useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import {GetOrder} from '../../../httpRequests/customer/orders'
import { useSelector } from 'react-redux';
import {useHistory,useLocation } from 'react-router-dom';
import {Status} from './miniComponents/Status';
import IconButton from '@material-ui/core/IconButton';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

function convertDate(date){  
  let d=new Date(date);
  let dd = String(d.getDate()).padStart(2, '0');
  let mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = d.getFullYear();
  return( mm + '/' + dd + '/' + yyyy);}


  
  function OrderInfo(props){
    return (
      <div style={{marginBottom:15,marginTop:15}} >
      <div style={{display: 'flex',  justifyContent:'left', alignItems:'left'}} >{"order number: "+props.orderInfo.orderNumber}</div>
      <div style={{display: 'flex',  justifyContent:'left', alignItems:'left'}}>{"address: "+props.orderInfo.address.street+" "+props.orderInfo.address.building+", "+props.orderInfo.address.city}</div>
     { (props.orderInfo.creationDate)&&<div style={{display: 'flex',  justifyContent:'left', alignItems:'left'}}>{"creation Date: "+convertDate(props.orderInfo.creationDate)}</div>}
     { (props.orderInfo.ExpectedDeliverDate)&&<div style={{display: 'flex',  justifyContent:'left', alignItems:'left'}}>{"Expected Deliver Date: "+convertDate(props.orderInfo.ExpectedDeliverDate)}</div>}
     { (props.orderInfo.DeliverDate)&&<div style={{display: 'flex',  justifyContent:'left', alignItems:'left'}}>{"Deliver Date: "+convertDate(props.orderInfo.DeliverDate)}</div>}
     <div style={{display: 'flex',  justifyContent:'left', alignItems:'left'}} ><Status status={props.orderInfo.status[0]}/></div>

      </div>
    );
  }



  
function GoToOrdersButton(props) {const {onClick}=props;return(<IconButton onClick={(e)=>{e.preventDefault();onClick();}}aria-label="add" ><LocalMallOutlinedIcon /> </IconButton>);}

export function ViewOrders(props){
  const responsive='standard';
  const tableBodyHeight='100%';
  const tableBodyMaxHeight='';
  const history = useHistory();
  const location = useLocation();
 
  const columns = [ 
      {name: "image",label: " ",options: {filter: true,sort: true}},
      {name: "name",label: "product",options: {filter: true,sort: true}},
      {name: "amount",label: "amount",options: {filter: true,sort: true}}
    ];

  const options = {delete:false,search: true,download: true,print: true,viewColumns: true,filter: true,selectableRows:'none',filterType: 'dropdown',responsive,tableBodyHeight,tableBodyMaxHeight,
  customToolbarSelect: () => {},
  customToolbar: () => {return (<GoToOrdersButton onClick={()=>{history.push('/customer/orders/watch')}}/>);},
  onTableChange: (action, state) => {}};
  const state=useSelector((state)=>state);
  const [data,setData]=useState([]);
  const [orderInfo,setOrderInfo]=useState({
    orderNumber:'',status:'',
    ExpectedDeliverDate:new Date(),creationDate:new Date(), DeliverDate:new Date(),
    address: {city: "", street: "", building: 0}
   });

  useEffect(() => {
    GetOrder(state.user._id,location.state.orderNumber).then((res)=>{
      res.order.productList.forEach(element => {
        element.image=(<img width={50} src={element.urlImage}/>);
        element.amount=("x"+element.amount);
     });
     setOrderInfo({
       orderNumber:res.order._id,status:res.order.status,
       ExpectedDeliverDate:res.order.ExpectedDeliverDate, 
       creationDate:res.order.creationDate,
       DeliverDate:res.order.DeliverDate,
       address: {city:res.order.address.city, street:res.order.address.street, building:res.order.address.building}
    });
      setData( res.order.productList);});
  },[]);
  const a=(<MUIDataTable title={<OrderInfo orderInfo={orderInfo}/>} data={data} columns={columns} options={options} />);
  return (a);

 
}




  