import React, { useState,useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import {GetOrders,SetDelivered} from '../../../httpRequests/deliverer/orders'
import { useSelector } from 'react-redux';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {useHistory} from 'react-router-dom';
import {Chip,IconButton} from '@material-ui/core';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';


function Map(props) {const {onMap}=props;return(<IconButton onClick={(e)=>{e.preventDefault();onMap();}}aria-label="add" ><RoomOutlinedIcon /></IconButton>);}
function ActionButtons(props){
    return (
    <div> 
        <IconButton color="primary" disabled={props.disabled} onClick={(e)=>{e.preventDefault();props.onUpdate(props.id);}}aria-label="update" ><EditOutlinedIcon /></IconButton>
        <h8>set as delivered</h8>
    </div>  
);}


function Status(props){
return(<React.Fragment>
  {(props.status[0]==="in progress")&&(<Chip color="primary"label={props.status} size="small"/>)}
  {(props.status[0]==="new")&&(<Chip color="secondary" label={props.status} size="small"/>)}
  {(props.status[0]==="delivered")&&(<Chip label={props.status} size="small"/>)}
</React.Fragment>);}



export function ViewOrdersByDeliverer() {
    const responsive='standard';
    const tableBodyHeight='100%';
    const tableBodyMaxHeight='';
    const state=useSelector((state)=>state);
    const [data,setData]=useState([]);
    const history = useHistory();
    function updateOrder(id){
        SetDelivered(id).then((isUpdated)=>{
            if(isUpdated){ window.location.reload();}
        });
    }
    
    useEffect(() => {
      GetOrders(state.user._id).then((res)=>{   
        res.forEach(element => {
          if(element.DeliverDate)element.DeliverDate=element.DeliverDate.split('T')[0];
          if(element.ExpectedDeliverDate)element.ExpectedDeliverDate=element.ExpectedDeliverDate.split('T')[0];
          element.Actions=(<ActionButtons disabled={element.status[0]==="delivered"} onUpdate={()=>{updateOrder(element._id)}} id={element._id}/>);
          element.Status=<Status status={element.status}/>
       });
        setData(res);});
    },[]);
  
   
    const columns = [
        {name: "_id",label: "Order Code",options: {filter: true,sort: true}},
        {name: "Status",label: "Status",options: {filter: true,sort: true}},
        {name: "ExpectedDeliverDate",label: "Expected Deliver Date",options: {filter: true,sort: true}},
        {name: "DeliverDate",label: "Deliver Date",options: {filter: true,sort: true,}},
        {name: "Actions",label: " ",options: {filter: true,sort: true,}}
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
        return(<Map onMap={()=>{history.push('/deliverer/orders/viewOnMap');}}/>)
      }
  };
   
  return (<MUIDataTable title={<h1>Orders</h1>} data={data} columns={columns} options={options} />);
  
}