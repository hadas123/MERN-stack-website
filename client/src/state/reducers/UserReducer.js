
const initialValue=()=>{
    let user=JSON.parse(localStorage.getItem('user'));
    if(user){return user;}
    else {return null;}
 }

export const UserReducer=(state=initialValue(),action)=>{
    switch (action.type) {
        case 'SetUser':  
           return action.pyload;  
        default:
            return state;
    }

};