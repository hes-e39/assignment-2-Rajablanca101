import { useEffect } from 'react';
import { useTimer } from './TimerContext';

type TabataProps = {
  work: number;
  rest: number;
  rounds: number;
};

const Tabata: React.FC<TabataProps> = ({ work, rest, rounds }) => {
  const {
    tabataState,
    setTabataState,
    shouldStartTabata,
    setShouldStartTabata,
  } = useTimer();

  useEffect(() => {
    if (shouldStartTabata) {
    
      setTabataState((prev) => ({
        ...prev,
        isRunning: true,
        isPaused: false,
        currentRound: 1,
        workTime: work,
        restTime: rest,
        isResting: false,
      }));
      setShouldStartTabata(false);
    }
  }, [shouldStartTabata, setTabataState, setShouldStartTabata, work, rest]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (tabataState.isRunning && !tabataState.isPaused) {
      interval = setInterval(() => {
        setTabataState((prev) => {
          if (prev.isResting) {
            if (prev.restTime > 0) {
              return { ...prev, restTime: prev.restTime - 1 };
            } else {
              return {
                ...prev,
                isResting: false,
                workTime: work,
                currentRound: prev.currentRound + 1,
              };
            }
          } else {
            if (prev.workTime > 0) {
              return { ...prev, workTime: prev.workTime - 1 };
            } else if (prev.currentRound < rounds) {
              return { ...prev, isResting: true, restTime: rest };
            } else {
              clearInterval(interval);
              return { ...prev, isRunning: false, message: 'Finished!' };
            }
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    tabataState.isRunning,
    tabataState.isPaused,
    work,
    rest,
    rounds,
    setTabataState,
  ]);

  return (
    <div
      className={`flex flex-col items-center p-6 rounded-lg shadow-md w-full max-w-sm ${
        tabataState.isRunning
          ? 'border-4 border-red-500'
          : 'border-2 border-gray-300'
      }`}
    >
      <h1 className="text-5xl font-bold mb-4 text-center">Tabata Timer</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">
          Round {tabataState.currentRound} of {rounds}
        </h2>
        <h2
          className={`text-2xl font-mono mb-8 ${
            tabataState.isResting ? 'text-blue-500' : 'text-green-500'
          }`}
        >
          {tabataState.isResting
            ? `Rest Time: ${tabataState.restTime} seconds`
            : `Work Time: ${tabataState.workTime} seconds`}
        </h2>
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          {tabataState.message}
        </h2>
      </div>
    </div>
  );
};

export default Tabata;
