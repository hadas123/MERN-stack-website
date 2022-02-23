


export const IsLogInReducer=(state=(!(!(localStorage.getItem('user')))),action)=>{
    switch (action.type) {
        case 'login':
           return true; 
        case 'logout': 
            return false;
        default:
            return state;
    }

};
 