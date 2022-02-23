
const initialValue=()=>{
   let user=JSON.parse(localStorage.getItem('user'));
   if(user){return user.role;}
   else {return 'geust';}
}


export const RoleReducer=(state=initialValue(),action)=>{
    switch (action.type) {
        case 'setRoleToCustomer':   
           return "customer"; 
        case 'setRoleToAdministrator':   
           return "administrator";
        case 'setRoleToDeliverer':   
           return "deliverer";  
        case 'setRoleToGuest':   
           return "guest";     
        default:
            return state;
    }

};