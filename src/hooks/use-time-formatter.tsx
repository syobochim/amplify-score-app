import { useCallback } from 'react';

export const useTimeFormatter = () => {
  const formatTime = useCallback((time?: number | null) => {
    if (time === null || time === undefined) {
      return "00:00:00";
    }
    const seconds = `${Math.floor((time / 1000) % 60)}`.padStart(2, '0');
    const minutes = `${Math.floor((time / (1000 * 60)) % 60)}`.padStart(2, '0');
    const hours = `${Math.floor(time / (1000 * 60 * 60))}`.padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }, []);

  return {formatTime};
};