import Axios from "axios";


export  function GetOrders(delivererId){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'GET',
          withCredentials:true,
          url:'http://localhost:3001/deliverer/orders/getOrders/'+delivererId
      }).then((res)=>{ resolve(res.data.orders);});
    });
  }



  export  function SetDelivered(orderCode){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'POST',
          withCredentials:true,
          data:{_id:orderCode},
          url:'http://localhost:3001/deliverer/orders/updateOrder'
      }).then((res)=>{ resolve(res.status===200);});
    });
  }
