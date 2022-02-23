import Axios from 'axios';







export function LoginWithGoogle(googleRes){
  return new Promise((resolve,reject)=>{
    Axios({
        method:'POST',
        url:'http://localhost:3001/user/auth/google/login',
        withCredentials:true,
        data:{googleId:googleRes.googleId, profile:googleRes.googleId,token:googleRes.tokenObj}
       
    }).then((res)=>{resolve(res.data);});
  });
}
export function logoutInServer(res){
  return new Promise((resolve,reject)=>{
    Axios({
        method:'GET',
        withCredentials:true,
        url:'http://localhost:3001/user/auth/logout'}).then((res)=>{
        resolve( (res.status===200));
    });
  });
}
export function RegisterWithGoogle(googleRes){
  return new Promise((resolve,reject)=>{ 
    Axios({
        method:'POST',
        withCredentials:true,
        url:'http://localhost:3001/user/auth/google/register',
        data:googleRes
    }).then((res)=>{resolve(res.status===200);});
  });
}
export function LoginLocally(_data){
  return new Promise((resolve,reject)=>{ 
  Axios({
        method:'POST',
        withCredentials:true,
        url:'http://localhost:3001/user/auth/server/login',
        data:{email:_data.email,password:_data.password}        
    }).then((res)=>{resolve(res.data);});
  });
}

export function RegisterLocally(_data,_image){
  return new Promise((resolve,reject)=>{
    var formData = new FormData();
    formData.append('firstName', _data.firstName);
    formData.append('lastName', _data.lastName);
    formData.append('userName', _data.userName);
    formData.append('password', _data.password);
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
        url:'http://localhost:3001/user/auth/server/register',
        data:formData,
        headers: {'Content-Type': 'multipart/form-data' }
    }).then((res)=>{resolve((res.status===200));});
    
  });
}
export function SendMeResetCode(email){
  return new Promise((resolve,reject)=>{
    Axios({
        method:'POST',
        withCredentials:true,
        data:{email:email},
        url:'http://localhost:3001/user/auth/SendMeResetCode/'+email}).then((res)=>{
        resolve( (res.status===200));
    });
  });
}
export function ResetPasswordInserver(data){
  return new Promise((resolve,reject)=>{
    Axios({
        method:'POST',
        withCredentials:true,
        data: {newPassword:data.password,resetCode:data.code,email:data.email},
        url:'http://localhost:3001/user/auth/ResetPassword'}).then((res)=>{resolve( (res.status===200));});
  });
}
export function IsLogedIn(){
  return new Promise((resolve,reject)=>{
   
    Axios({
        method:'GET',
        withCredentials:true,
        url:'http://localhost:3001/user/auth/isLogedIn'}).then((res)=>{
        resolve( (res.status===200));
    });
  });
}

