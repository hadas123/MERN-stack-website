import React, { useState,useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import {GetOrders} from '../../../../httpRequests/administrator/orders'
import { useSelector } from 'react-redux';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {useHistory} from 'react-router-dom';
import {Chip} from '@material-ui/core';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import {ProfileInfo} from '../../profile/miniComponents/profileInfo';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';



function ActionButtons(props){
  return (<>
  {/* <IconButton color="primary" disabled={props.disabled} onClick={(e)=>{e.preventDefault();props.onUpdate(props.id);}}aria-label="update" >
    <EditOutlinedIcon />
  </IconButton> */}
  <IconButton  color="primary"  onClick={(e)=>{e.preventDefault();props.onView(props.id);}}aria-label="view" >
    <VisibilityOutlinedIcon />
  </IconButton>
  </>);
}

function Map(props) {const {onMap}=props;return(<IconButton onClick={(e)=>{e.preventDefault();onMap();}}aria-label="charts" ><RoomOutlinedIcon /></IconButton>);}
function Chart(props) {const {onAdd}=props;return(<IconButton onClick={(e)=>{e.preventDefault();onAdd();}}aria-label="charts" ><EqualizerOutlinedIcon /></IconButton>);}
function Edit(props) {const {onEdit}=props;return(<IconButton onClick={(e)=>{e.preventDefault();onEdit();}}aria-label="Edit" ><EditOutlinedIcon /></IconButton>);}


function Status(props){
return(<React.Fragment>
  {(props.status[0]==="in progress")&&(<Chip color="primary"label={props.status} size="small"/>)}
  {(props.status[0]==="new")&&(<Chip color="secondary" label={props.status} size="small"/>)}
  {(props.status[0]==="delivered")&&(<Chip label={props.status} size="small"/>)}
</React.Fragment>);}


export function ViewOrdersByAdministrator (){
  const responsive='standard';
  const tableBodyHeight='100%';
  const tableBodyMaxHeight='';
  const state=useSelector((state)=>state);
  const [data,setData]=useState([]);
  const history = useHistory();
  function ViewOrder(id){history.push({pathname: '/administrator/orders/viewOrderInfo',state: { orderNumber: id }});}

  
  useEffect(() => {
    GetOrders(state.user._id).then((res)=>{
      res.forEach(element => {
        if(element.DeliverDate)element.DeliverDate=element.DeliverDate.split('T')[0];
        if(element.ExpectedDeliverDate)element.ExpectedDeliverDate=element.ExpectedDeliverDate.split('T')[0];
        element.creationDate=element.creationDate.split('T')[0];
        element.Actions=(<ActionButtons disabled={element.status[0]==="delivered"} onView={ViewOrder} id={element._id}/>);
        element.Status=(<Status status={element.status}/>);
        element.customer=(<ProfileInfo userId={element.customerId}/>);
        if(element.deliverId)element.deliverer=(<ProfileInfo userId={element.deliverId}/>);
      });
      setData(res);});
  },[]);

 
  const columns = [
      {name: "_id",label: "Order Code",options: {filter: true,sort: true}},
      {name: "customer",label: "customer",options: {filter: true,sort: false}},
      {name: "deliverer",label: "deliverer",options: {filter: true,sort: false}},
      {name: "Status",label: "Status",options: {filter: true,sort: true}},
      {name: "creationDate",label: "Creation Date",options: {filter: true,sort: true}},
      {name: "ExpectedDeliverDate",label: "Expected Deliver Date",options: {filter: true,sort: true}},
      {name: "DeliverDate",label: "Deliver Date",options: {filter: true,sort: true,}},
      {name: "Actions",label: " ",options: {filter: true,sort: false,}}
    ];

  const options = {
    delete:true,
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    filterType: 'dropdown',
    responsive,tableBodyHeight,tableBodyMaxHeight,
    selectableRows:'none',
    customToolbar: () => {
      return(<>
      <Edit onEdit={()=>{history.push('/administrator/orders/setDeliverersForOrders');}}/>
      <Map onMap={()=>{history.push('/administrator/orders/viewOnMap');}}/>
      <Chart onAdd={()=>{
        GetOrders(state.user._id).then((res)=>{
          history.push({pathname: '/administrator/orders/charts',state: { orderList: res }});
        });}}/>
      </>)}
    };
  

  return (<MUIDataTable title={<h2>orders</h2>} data={data} columns={columns} options={options} />);

 
}




  