import {createStore,applyMiddleware} from 'redux';
import reduces from './reducers/index';
import thunk from 'redux-thunk';

 const store=createStore(
    reduces,{},applyMiddleware(thunk)
);
export default store;