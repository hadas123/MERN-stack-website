import { AreaChart, Area,Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import {useHistory,useLocation } from 'react-router-dom';






const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

function formateData(orderList) {
  console.log(orderList);
  let ordersByCreationDate=(orderList.filter((e)=>{return e.creationDate;})); 
  ordersByCreationDate=ordersByCreationDate.map((e)=>{e.creationDate=e.creationDate.split('T')[0];return e;});
  let ordersByDeliverDate=(orderList.filter((e)=>{return e.DeliverDate}));
  ordersByDeliverDate=ordersByDeliverDate.map((e)=>{e.DeliverDate=e.DeliverDate.split('T')[0];return e;})

  let a=[]; let b=[]; 
  let c=groupBy('creationDate')(ordersByCreationDate);
   Object.keys(c).forEach((date, index) => {
     a.push({name:date,Created:c[date].length});
   });
   ordersByCreationDate=a;
   let d=groupBy('DeliverDate')(ordersByDeliverDate);
   Object.keys(d).forEach((date, index) => {
    b.push({name:date,Delivered:d[date].length});
  });
  ordersByDeliverDate=b;
let ordersForGrafh=[];
let orders=groupBy('name')(ordersByCreationDate.concat(ordersByDeliverDate));
  Object.keys(orders).forEach((date, index) => {
    
    let Created=orders[date].reduce((a, b) => a + (b['Created'] || 0), 0);
    let Delivered=orders[date].reduce((a, b) => a + (b['Delivered'] || 0), 0);
    ordersForGrafh.push({name:orders[date][0].name,Created:Created,Delivered:Delivered});
  });

 return  ordersForGrafh.sort((a, b) => {let q= new Date(a.name)-new Date(b.name);return q;});
 
}



export function ChartOrders() {
    const location = useLocation();
    return(
        <AreaChart width={1100} height={450} data={formateData(location.state.orderList)}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f44336" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#f44336" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorInProgress" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3f51b5" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3f51b5" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9e9e9e" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#9e9e9e" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="Created" stroke="#f44336" fillOpacity={1} fill="url(#colorCreated)" />
        {/* <Area type="monotone" dataKey="InProgress" stroke="#3f51b5" fillOpacity={1} fill="url(#colorInProgress)" /> */}
        <Area type="monotone" dataKey="Delivered" stroke="#9e9e9e" fillOpacity={1} fill="url(#colorDelivered)" />
      </AreaChart>
    );   
   }