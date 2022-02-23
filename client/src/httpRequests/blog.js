import Axios from 'axios';




export function GetPosts(){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'GET',
          withCredentials:true,
          url:'http://localhost:3001/user/blog/viwe',
      }).then((res)=>{
        if(res.status==200) resolve(res.data.posts);
        else resolve(null);
        });
      
    });
  }


  export function AddPostInServer(title,content){
    return new Promise((resolve,reject)=>{
      Axios({
          method:'POST',
          withCredentials:true,
          data:{title:title,content:content},
          url:'http://localhost:3001/user/blog/addPost',
      }).then((res)=>{resolve((res.status==200));});
      
    });
  }