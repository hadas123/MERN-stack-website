import {Bar,Legend,BarChart ,Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import {useHistory,useLocation } from 'react-router-dom';

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

function formatData(usersList) {
    usersList.forEach(element => {element.city=element.address?.city;});
    let users=(usersList.filter((e)=>{return (e.role==='customer')||(e.role==='deliverer');})); 
    let usersByCities=groupBy('city')(users);
    let a=[];
    Object.keys(usersByCities).forEach(key => {
        let customerAmount=usersByCities[key].filter(e=>e.role==='customer').length;
        let delivererAmount=usersByCities[key].filter(e=>e.role==='deliverer').length;
        a.push({name:key,customers:customerAmount,deliverers:delivererAmount});
    });
    return a;
}


export function ChartUsers() {
    const location = useLocation();
    return(
    <BarChart width={1000} height={500}  margin={{ left: 150, top:50}}  data={formatData(location.state.usersList)}>
         <CartesianGrid strokeDasharray="3 3" /> 
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="customers" fill="#8884d8" />
        <Bar dataKey="deliverers" fill="#82ca9d" />
    </BarChart>);   
   }