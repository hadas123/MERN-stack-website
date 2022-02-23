import './chat.css'
import {ChatEngine} from 'react-chat-engine';
import { useSelector } from 'react-redux';


export function Chat() {
    const state=useSelector((state)=>state);
  return (
    <ChatEngine
      height="100vh"
      projectID="13df7729-7309-421c-98c6-331ce84f065a"
      userName={state.user.userName}
      userSecret={state.user._id}
    /> 
  );
}
