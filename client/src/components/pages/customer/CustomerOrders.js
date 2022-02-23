import React, { useState,useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import {GetOrders,delete_order} from '../../../httpRequests/customer/orders'
import { useSelector } from 'react-redux';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {useHistory} from 'react-router-dom';
import {Chip} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';





function ActionButtons(props){
  return (<>
  <IconButton color="primary" disabled={props.disabled} onClick={(e)=>{e.preventDefault();props.onUpdate(props.id);}}aria-label="update" >
    <EditOutlinedIcon />
  </IconButton>
  <IconButton  color="primary"  onClick={(e)=>{e.preventDefault();props.onView(props.id);}}aria-label="view" >
    <VisibilityOutlinedIcon />
  </IconButton>
  </>);
}


function Add(props) {const {onAdd}=props;return(<IconButton onClick={(e)=>{e.preventDefault();onAdd();}}aria-label="add" ><AddIcon /></IconButton>);}


function Status(props){
return(<React.Fragment>
  {(props.status[0]==="in progress")&&(<Chip color="primary"label={props.status} size="small"/>)}
  {(props.status[0]==="new")&&(<Chip color="secondary" label={props.status} size="small"/>)}
  {(props.status[0]==="delivered")&&(<Chip label={props.status} size="small"/>)}
</React.Fragment>);}


export function CustomerOrders (){
  const responsive='standard';
  const tableBodyHeight='100%';
  const tableBodyMaxHeight='';
  const state=useSelector((state)=>state);
  const [data,setData]=useState([]);
  const history = useHistory();
  const deleteOrder=(id)=>{setData([...data].filter(order=>order._id!==id));}
  function updateOrder(id){history.push({pathname: '/customer/order/update',state: { orderNumber: id }});}
  function ViewOrder(id){history.push({pathname: '/customer/order/view',state: { orderNumber: id }});}
 
  
  useEffect(() => {
    GetOrders(state.user._id).then((res)=>{
      res.forEach(element => {
        if(element.DeliverDate)element.DeliverDate=element.DeliverDate.split('T')[0];
        if(element.ExpectedDeliverDate)element.ExpectedDeliverDate=element.ExpectedDeliverDate.split('T')[0];
        element.creationDate=element.creationDate.split('T')[0];
        element.Actions=(<ActionButtons disabled={element.status[0]!=="new"} onDelete={deleteOrder} onView={ViewOrder} onUpdate={updateOrder} id={element._id}/>);
        element.Status=<Status status={element.status}/>
     });
      setData(res);});
  },[]);

 
  const columns = [
      {name: "_id",label: "Order Code",options: {filter: true,sort: true}},
      {name: "Status",label: "Status",options: {filter: true,sort: true}},
      {name: "creationDate",label: "Creation Date",options: {filter: true,sort: true}},
      {name: "ExpectedDeliverDate",label: "Expected Deliver Date",options: {filter: true,sort: true}},
      {name: "DeliverDate",label: "Deliver Date",options: {filter: true,sort: true,}},
      {name: "Actions",label: " ",options: {filter: true,sort: true,}}
    ];

  const options = {
    delete:true,search: true,download: true,print: true,viewColumns: true,
    filter: true,filterType: 'dropdown',responsive,tableBodyHeight,tableBodyMaxHeight,
    selectableRows:'single',
    customToolbar: () => {
      return(<Add onAdd={()=>{history.push('/customer/order/add');}}/>)
    },
    onRowsDelete: (rowsDeleted, dataRows) => { 
      delete_order(state.user._id,data[rowsDeleted.data[0].dataIndex]["_id"]).
    then((res)=>{return res;});
    },
    isRowSelectable:(dataIndex,selectedRows)=>{
      if((data[dataIndex].status[0])!=="new")
        return false;
      else return true;
  }
};
 
return (<MUIDataTable title={'Orders List'} data={data} columns={columns} options={options} />);

 
}




  