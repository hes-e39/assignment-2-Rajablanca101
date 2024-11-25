import { useEffect } from 'react';
import { useTimer } from './TimerContext';

const Countdown = () => {
  const {
    countdownTime,
    isCountdownRunning,
    setCountdownTime,
    setCountdownRunning,
    setStopwatchRunning, 
  } = useTimer();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isCountdownRunning) {
      interval = setInterval(() => {
        setCountdownTime((prevTime: number) => {
          if (prevTime > 0) return prevTime - 1000;

          clearInterval(interval!);
          setCountdownRunning(false);

          // Start the stopwatch
          setStopwatchRunning(true);

          return 0;
        });
      }, 1000);
    }

    return () => clearInterval(interval!);
  }, [
    isCountdownRunning,
    setCountdownTime,
    setCountdownRunning,
    setStopwatchRunning,
  ]);

  const fmt = (nr: number) => nr.toString().padStart(2, '0');

  const handleStart = () => {
    setCountdownRunning(true);
  };

  return (
    <div
      className={`flex flex-col items-center p-6rounded-lg shadow-md w-full max-w-sm ${
        isCountdownRunning
          ? 'border-4 border-red-500'
          : 'border-2 border-gray-300'
      }`}
    >
      <h1 className="text-5xl font-bold mb-4 text-center">Countdown Timer</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-4xl font-mono text-blue-600 mb-8">
          {fmt(Math.floor((countdownTime / 60000) % 60))}:
          {fmt(Math.floor((countdownTime / 1000) % 60))}
        </div>
        <button
          onClick={handleStart}
          disabled={isCountdownRunning}
          className={`bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 ${
            isCountdownRunning ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Countdown;
