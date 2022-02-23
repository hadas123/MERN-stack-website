import Axios from 'axios';


export function EditProfileInServer(_data,_image,userId){
    return new Promise((resolve,reject)=>{
      var formData = new FormData();
      formData.append('firstName', _data.firstName);
      formData.append('lastName', _data.lastName);
      formData.append('phoneNumber', _data.phoneNumber);
      formData.append('email', _data.email);
      formData.append('city', _data.city);
      formData.append('street', _data.street);
      formData.append('building', _data.building);
      formData.append('image', _image);
      formData.append('userId', userId);
      Axios({
          method:'POST',
          withCredentials:true,
          url:'http://localhost:3001/user/profile/updateProfile',
          data:formData,
          headers: {'Content-Type': 'multipart/form-data' }
      }).then((res)=>{resolve({isEdited:(res.status===200),error:(res?.data.error)});})
      .catch(error=>{resolve({isEdited:(error.response.data.status===200),
        error:(error.response.data.error)})});
      
    });
  }


  export function getProfile(userId){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'GET',
          withCredentials:true,
          url:'http://localhost:3001/user/profile/getProfile/'+userId,
      }).then((res)=>{
        if(res.status==200) resolve(res.data.user);
        else resolve(null);
        });
      
    });
  }