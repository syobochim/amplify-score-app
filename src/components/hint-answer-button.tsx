// components/hint-answer-button.tsx
import React from 'react';
import { Button, ButtonGroup, View } from "@aws-amplify/ui-react";

interface HintAnswerButtonsProps {
  showHint: boolean;
  showAnswer: boolean;
  onShowHint: () => void;
  onShowAnswer: () => void;
}

export const HintAnswerButtons: React.FC<HintAnswerButtonsProps> =
  ({
     showHint,
     showAnswer,
     onShowHint,
     onShowAnswer
   }) => {
    return (
      <View as="div">
        <ButtonGroup justifyContent="center" marginBlock="10px">
          <Button className="button" isDisabled={showHint} onClick={onShowHint}>ヒントを見た</Button>
          <Button className="button" isDisabled={showAnswer} onClick={onShowAnswer}>解答を見た</Button>
        </ButtonGroup>
      </View>
    );
  };
