import React from 'react';
import { Text } from "@aws-amplify/ui-react";

interface InfoDisplayProps {
  participantName: string;
  totalScore: number;
}

export const InfoDisplay: React.FC<InfoDisplayProps> = ({participantName, totalScore}) => {
  return (
    <div>
      <Text fontSize="2em">Hi! {participantName} さん</Text>
      <Text fontSize="2em">Your Score: {totalScore}</Text>
    </div>
  );
};
