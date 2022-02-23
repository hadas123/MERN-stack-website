import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


export function Timer(props){
  return (
<CountdownCircleTimer size="100" isPlaying duration={300} colors={[ ['#3f51b5', 1]]}>
        {({ remainingTime }) =>{if(remainingTime===1){props.onFinish()} return Math.floor(remainingTime / 60)+":"+remainingTime % 60}} 
</CountdownCircleTimer>);
}


    
