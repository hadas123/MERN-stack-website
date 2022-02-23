import Axios from 'axios';


export  function GetDeliverers(){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'GET',
          withCredentials:true,
          url:'http://localhost:3001/administrator/users/getDeliverers'
      }).then((res)=>{ resolve(res.data.users);});
    });
  }


  export  function GetUsers(){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'GET',
          withCredentials:true,
          url:'http://localhost:3001/administrator/users/getAllUsers'
      }).then((res)=>{ resolve(res.data.users);});
    });
  }



  export function AddUserInServer(_data,_image){
    return new Promise((resolve,reject)=>{
      var formData = new FormData();
      formData.append('firstName', _data.firstName);
      formData.append('lastName', _data.lastName);
      formData.append('userName', _data.userName);
      formData.append('phoneNumber', _data.phoneNumber);
      formData.append('email', _data.email);
      formData.append('city', _data.city);
      formData.append('street', _data.street);
      formData.append('building', _data.building);
      formData.append('role', _data.role);
      formData.append('image', _image);
      Axios({
          method:'POST',
          withCredentials:true,
          url:'http://localhost:3001/administrator/users/AddUser',
          data:formData,
          headers: {'Content-Type': 'multipart/form-data' }
      }).then((res)=>{resolve({isAdded:(res.status===200),error:(res?.data.error)});})
        .catch(error=>{resolve({isAdded:(error.response.data.status===200),
          error:(error.response.data.error)})});
      
    });
  }