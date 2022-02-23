import Axios from 'axios';


export  function GetOrders(customrtId){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'GET',
          withCredentials:true,
          url:'http://localhost:3001/customer/orders/getOrders/'+customrtId
      }).then((res)=>{ resolve(res.data);});
    });
  }

  export  function GetOrder(customrtId,OrderNumber){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'GET',
          withCredentials:true,
          url:'http://localhost:3001/customer/orders/getOrder/'+customrtId+'/'+OrderNumber
      }).then((res)=>{resolve(res.data);});
    });
  }

  export function getUserOrder(customrtId,orderNumber){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'GET',
          withCredentials:true,
          url:'http://localhost:3001/customer/orders/addOrder'+customrtId+'/'+orderNumber
      }).then((res)=>{resolve((res.status===200));});
    });
  }
  export function delete_order(customrtId,orderNumber){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'DELETE',
          withCredentials:true,
          url:'http://localhost:3001/customer/orders/deleteOrder/'+customrtId+'/'+orderNumber
      }).then((res)=>{
        console.log('onDelete');
        resolve((res.status===200));});
    });
  }

  export function updateOrder(data){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'POST',
          withCredentials:true,
          data:data,
          url:'http://localhost:3001/customer/orders/updateOrder'
      }).then((res)=>{resolve((res.status===200));});
    });
  }

  export function addOrder(data){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'POST',
          withCredentials:true,
          data:data,
          url:'http://localhost:3001/customer/orders/addOrder'
      }).then((res)=>{resolve((res.status===200));});
    });
  }


  export  function GetProducts(){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'GET',
          withCredentials:true, 
          url:'http://localhost:3001/customer/products/getProducts'
      }).then((res)=>{ resolve(res.data.products);});
    });
  }