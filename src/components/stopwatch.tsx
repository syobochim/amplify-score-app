import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Text, View } from '@aws-amplify/ui-react';
import { useTimeFormatter } from "../hooks/use-time-formatter.tsx";

interface StopwatchProps {
  onComplete: (time: number) => void;
}

const localStorageKey: string = "stopwatchTime";

export const Stopwatch: React.FC<StopwatchProps> = ({onComplete}) => {
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem(localStorageKey);
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [accumulatedTime, setAccumulatedTime] = useState<number>(0);

  useEffect(() => {
    let animationFrameId: number | undefined;

    const updateTimer = () => {
      if (isRunning && startTime !== null) {
        const currentTime = Date.now();
        setTime(accumulatedTime + (currentTime - startTime));
        animationFrameId = requestAnimationFrame(updateTimer);
      }
    };

    if (isRunning) {
      setStartTime(Date.now());
      animationFrameId = requestAnimationFrame(updateTimer);
    } else {
      if (startTime !== null) {
        setAccumulatedTime((prevAccumulatedTime) => prevAccumulatedTime + (Date.now() - startTime));
      }
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
    }

    return () => {
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRunning, startTime, accumulatedTime]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, time.toString());
  }, [time]);

  const timerStart = () => {
    setIsRunning(true);
  };

  const timerPause = () => {
    setIsRunning(false);
  };

  const timerStop = () => {
    setIsRunning(false);
    onComplete(time);
    setAccumulatedTime(0);
    setTime(0);
  };

  const {formatTime} = useTimeFormatter();

  return (
    <View textAlign="center">
      <Text fontSize="5em">{formatTime(time)}</Text>
      <ButtonGroup variation="primary" justifyContent="center">
        <Button onClick={timerStart}>Start</Button>
        <Button colorTheme="warning" onClick={timerPause}>Pause</Button>
        <Button colorTheme="success" onClick={timerStop}>Complete!</Button>
      </ButtonGroup>
    </View>
  );
};
