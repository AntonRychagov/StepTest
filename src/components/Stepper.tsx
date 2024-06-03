import { Stepper as MuiStepper, Step, StepLabel } from "@mui/material";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
  return (
    <MuiStepper activeStep={currentStep - 1}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <Step key={index}>
          <StepLabel />
        </Step>
      ))}
    </MuiStepper>
  );
};

export default Stepper;
