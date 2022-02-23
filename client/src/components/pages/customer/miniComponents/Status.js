import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

export function Status(props){


  const [activeStep, setActiveStep] = useState(props.status);
  const steps =['new', 'in progress', 'delivered'];
  function getActiveStep(status){
    if(status==='new')return 0;
    if(status==='in progress')return 1;
    if(status==='delivered')return 2;
  }
 
  return (  
      <Stepper activeStep={getActiveStep(props.status)} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
   
  );

}