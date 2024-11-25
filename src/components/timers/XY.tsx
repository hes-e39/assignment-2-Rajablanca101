import { useEffect } from 'react';
import { useTimer } from './TimerContext';

type XYProps = {
  timePerRound: number;
  rounds: number;
};

const XY: React.FC<XYProps> = ({ timePerRound, rounds }) => {
  const {
    xyState,
    setXYState,
    shouldStartXY,
    setShouldStartXY,
    setShouldStartTabata,
  } = useTimer();

  useEffect(() => {
    if (shouldStartXY) {
      // Automatically start XY when triggered by Stopwatch
      setXYState((prev) => ({
        ...prev,
        isXYRunning: true,
        isPaused: false,
        round: 1,
        count: timePerRound,
      }));
      setShouldStartXY(false); // Reset the trigger
    }
  }, [shouldStartXY, setXYState, setShouldStartXY, timePerRound]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (xyState.isXYRunning && !xyState.isPaused) {
      interval = setInterval(() => {
        setXYState((prev) => {
          if (prev.count > 0) {
            return { ...prev, count: prev.count - 1 };
          } else if (prev.round < rounds) {
            return { ...prev, round: prev.round + 1, count: timePerRound };
          } else {
            clearInterval(interval);
            setShouldStartTabata(true); // Trigger Tabata start when XY finishes
            return { ...prev, isXYRunning: false, message: 'Finished!' };
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    xyState.isXYRunning,
    xyState.isPaused,
    timePerRound,
    rounds,
    setXYState,
    setShouldStartTabata,
  ]);

  const handleStart = () => {
    setXYState((prev) => ({ ...prev, isXYRunning: true, isPaused: false }));
  };

  const handlePause = () => {
    setXYState((prev) => ({ ...prev, isPaused: true }));
    setShouldStartTabata(true); // Trigger Tabata start when paused
  };

  const handleReset = () => {
    setXYState((prev) => ({
      ...prev,
      round: 1,
      count: timePerRound,
      isXYRunning: false,
      isPaused: false,
      message: null,
    }));
  };

  return (
    <div
      className={`flex flex-col items-center p-6 rounded-lg shadow-md w-full max-w-sm ${
        xyState.isXYRunning && !xyState.isPaused
          ? 'border-4 border-red-500'
          : 'border-2 border-gray-300'
      }`}
    >
      <h1 className="text-5xl font-bold mb-4 text-center">XY Timer</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">
          Round {xyState.round} of {rounds}
        </h2>
        <h2 className="text-4xl font-mono text-blue-600 mb-8">
          {xyState.count} seconds
        </h2>
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          {xyState.message}
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={handleStart}
            disabled={xyState.isXYRunning && !xyState.isPaused}
            className={`bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 ${
              xyState.isXYRunning && !xyState.isPaused
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            Start
          </button>
          <button
            onClick={handlePause}
            disabled={!xyState.isXYRunning || xyState.isPaused}
            className={`bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 ${
              !xyState.isXYRunning || xyState.isPaused
                ? 'opacity-50 cursor-not-allowed'
                : ''
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

export default XY;
