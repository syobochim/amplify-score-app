import React from 'react';
import { Button, ButtonGroup, View } from "@aws-amplify/ui-react";

interface StepButtonsProps {
  onStepChange: (step: number) => void;
}

export const StepButtons: React.FC<StepButtonsProps> = ({onStepChange}) => {
  return (
    <View as="div">
      <ButtonGroup className="button-group" justifyContent="center">
        <Button className="button" onClick={() => onStepChange(2)}>Step1</Button>
        <Button className="button" onClick={() => onStepChange(2)}>Step2</Button>
        <Button className="button" onClick={() => onStepChange(2)}>Step3</Button>
      </ButtonGroup>
    </View>
  );
};
