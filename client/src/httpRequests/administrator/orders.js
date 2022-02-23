import Axios from 'axios';


export  function GetOrders(customrtId){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'GET',
          withCredentials:true,
          url:'http://localhost:3001/administrator/orders/getAllOrders'
      }).then((res)=>{ resolve(res.data.orders);});
    });
  }

  export  function GetOrder(OrderNumber){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'GET',
          withCredentials:true,
          url:'http://localhost:3001/administrator/orders/getOrder/'+OrderNumber
      }).then((res)=>{resolve(res.data);});
    });
  }


  export  function GetDistributionProposal(_orders,_deliverers){
    
    return new Promise((resolve,reject)=>{
      Axios({
          method:'POST',
          withCredentials:true,
          data:{orders:_orders,deliverers:_deliverers},
          url:'http://localhost:3001/administrator/orders/getOfferedDistributionWithDeliverers'
      }).then((res)=>{ resolve(res.data.proposal);});
    });
  }

  export  function SetDistributionProposal(_date,_orders,_deliverers){
    
    return new Promise((resolve,reject)=>{
      Axios({
          method:'POST',
          withCredentials:true,
          data:{date:_date,orders:_orders,deliverers:_deliverers},
          url:'http://localhost:3001/administrator/orders/setDistributionWithDeliverers'
      }).then((res)=>{ resolve(res.status);});
    });
  }