import {combineReducers} from 'redux';
import {IsLogInReducer} from './IsLogInReducer';
import {RoleReducer} from './RoleReducer';
import {UserReducer} from './UserReducer';
 
const reducers=combineReducers({

    login:IsLogInReducer,
    role:RoleReducer,
    user:UserReducer,

});
export default reducers;