import { useEffect } from 'react';
import { useTimer } from './TimerContext';

const StopWatch = () => {
  const {
    stopwatchTime,
    isStopwatchRunning,
    setStopwatchTime,
    setStopwatchRunning,
    setShouldStartXY, 
  } = useTimer();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime((prevTime: number) => prevTime + 1000);
      }, 1000);
    }

    return () => clearInterval(interval!);
  }, [isStopwatchRunning, setStopwatchTime]);

  const fmt = (nr: number) => nr.toString().padStart(2, '0');

  const handleStart = () => {
    setStopwatchRunning(true);
  };

  const handlePause = () => {
    setStopwatchRunning(false);
    setShouldStartXY(true); 
  };

  const handleReset = () => {
    setStopwatchRunning(false);
    setStopwatchTime(0);
  };

  return (
    <div
      className={`flex flex-col items-center p-6 rounded-lg shadow-md w-full max-w-sm ${
        isStopwatchRunning
          ? 'border-4 border-red-500'
          : 'border-2 border-gray-300'
      }`}
    >
      <h1 className="text-5xl font-bold mb-4 text-center">Stopwatch</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <div className="text-4xl font-mono text-blue-600 mb-8">
          {fmt(Math.floor((stopwatchTime / 60000) % 60))}:
          {fmt(Math.floor((stopwatchTime / 1000) % 60))}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleStart}
            disabled={isStopwatchRunning}
            className={`bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 ${
              isStopwatchRunning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Start
          </button>
          <button
            onClick={handlePause}
            disabled={!isStopwatchRunning}
            className={`bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 ${
              !isStopwatchRunning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Pause
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default StopWatch;
