import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Text, View } from '@aws-amplify/ui-react';
import { useTimeFormatter } from "../hooks/use-time-formatter.tsx";

interface StopwatchProps {
  onComplete: (time: number) => void;
}

const localStorageKey: string = "stopwatchTime"

export const Stopwatch: React.FC<StopwatchProps> = ({onComplete}) => {
  const [time, setTime] = useState(() => {
    // localStorageから取得する
    const savedTime = localStorage.getItem(localStorageKey);
    return savedTime ? parseInt(savedTime, 10) : 0
  });
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined)

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      setIntervalId(interval)
    } else {
      window.clearInterval(intervalId);
      setIntervalId(undefined)
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // ブラウザリロードしてもいいように、localStorageへ保存
  useEffect(() => {
    localStorage.setItem(localStorageKey, time.toString())
  }, [time]);

  const timerStart = () => {
    setIsRunning(true);
  };

  const timerPause = () => {
    setIsRunning(false);
  };

  const timerStop = () => {
    setIsRunning(false);
    onComplete(time)
  }

  const {formatTime} = useTimeFormatter()

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