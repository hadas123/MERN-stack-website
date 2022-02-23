


import React, { useState,useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import {GetOrders} from '../../../../httpRequests/administrator/orders'
import { useSelector } from 'react-redux';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {useHistory} from 'react-router-dom';
import {Avatar, Chip} from '@material-ui/core';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import {GetUsers} from '../../../../httpRequests/administrator/users';
import AddIcon from '@material-ui/icons/Add';









function Chart(props) {const {onAdd}=props;return(<IconButton onClick={(e)=>{e.preventDefault();onAdd();}}aria-label="charts" ><EqualizerOutlinedIcon /></IconButton>);}
function Add(props) {const {onAdd}=props;return(<IconButton onClick={(e)=>{e.preventDefault();onAdd();}}aria-label="Edit" ><AddIcon /></IconButton>);}
function Role(props){
    return(<React.Fragment>
      {(props.role==="deliverer")&&(<Chip color="primary"label={props.role} size="small"/>)}
      {(props.role==="customer")&&(<Chip color="secondary" label={props.role} size="small"/>)}
      {(props.role==="administrator")&&(<Chip label={props.role} size="small"/>)}
    </React.Fragment>);
}

export function ViewUsers() {
    const responsive='standard';
    const tableBodyHeight='100%';
    const tableBodyMaxHeight='';
    const state=useSelector((state)=>state);
    const [data,setData]=useState([]);
    const history = useHistory();
    function ViewUser(id){history.push({pathname: '/administrator/users/viewUserInfo',state: { userId: id }});}

    useEffect(() => {
        GetUsers().then((res)=>{
            res.forEach(element => {
                element.city=element.address?.city;
                element.street=element.address?.street;
                element.building=element.address?.building;
                element.image=(<Avatar><img width='100%' src={element.urlImage}/></Avatar>);
                element.role=(<Role role={element.role}/>);
            });

          setData(res);});
    },[]);
    
      
    const columns = [
        {name: "image",label: "image",options: {filter: false,sort: false}},
        {name: "userName",label: "User Name",options: {filter: true,sort: true}},
        {name: "firstName",label: "First Name",options: {filter: true,sort: true}},
        {name: "lastName",label: "Last Name",options: {filter: true,sort: true}},
        {name: "email",label: "Email",options: {filter: true,sort: true}},
        {name: "phoneNumber",label: "Phone Number",options: {filter: true,sort: true}},
        {name: "role",label: "Role",options: {filter: false,sort: false}},
        {name: "city",label: "City",options: {filter: true,sort: true,}},
        {name: "street",label: "Street",options: {filter: true,sort: true}},
        {name: "building",label: "Building",options: {filter: true,sort: true}}
      ];
    
      const options = {
        delete:true,search: true,download: true,print: true,viewColumns: true,
        filter: true,filterType: 'dropdown',responsive,tableBodyHeight,tableBodyMaxHeight,
        selectableRows:'none',
        customToolbar: () => {
          return(
          <React.Fragment>
            <Add onAdd={()=>{history.push('/administrator/users/add');}}/>
            <Chart onAdd={()=>{GetUsers().then((res)=>{
                        history.push({pathname: '/administrator/users/charts',state: { usersList: res }});
                    });
                }}/>
          </React.Fragment>
          )
        }};
      
    
      return (<MUIDataTable title={<h2>Users</h2>} data={data} columns={columns} options={options} />);
   }