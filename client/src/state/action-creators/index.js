import {login,logout} from './logAction';
import {setRoleToCustomer,setRoleToAdministrator,setRoleToDeliverer,setRoleToGuest} from './setRoleAction'
import {setUser} from './setUser';

const actionCreators= {login,logout,
    setRoleToCustomer,setRoleToAdministrator,setRoleToDeliverer,setRoleToDeliverer,setRoleToGuest,
    setUser
};
export default actionCreators;