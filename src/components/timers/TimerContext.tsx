import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TimerContextType {
  countdownTime: number;
  setCountdownTime: (value: number | ((prev: number) => number)) => void;
  isCountdownRunning: boolean;
  setCountdownRunning: (value: boolean) => void;

  stopwatchTime: number;
  setStopwatchTime: (value: number | ((prev: number) => number)) => void;
  isStopwatchRunning: boolean;
  setStopwatchRunning: (value: boolean) => void;

  shouldStartXY: boolean;
  setShouldStartXY: (value: boolean) => void;

  shouldStartTabata: boolean;
  setShouldStartTabata: (value: boolean) => void;

  xyState: XYState;
  setXYState: React.Dispatch<React.SetStateAction<XYState>>;

  tabataState: TabataState;
  setTabataState: React.Dispatch<React.SetStateAction<TabataState>>;

  currentTimer: string;
  setCurrentTimer: (value: string) => void;
}

interface XYState {
  round: number;
  count: number;
  isXYRunning: boolean;
  isPaused: boolean;
  message: string | null;
}

interface TabataState {
  currentRound: number;
  workTime: number;
  restTime: number;
  isRunning: boolean;
  isPaused: boolean;
  isResting: boolean;
  message: string | null;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [countdownTime, setCountdownTime] = useState<number>(6000);
  // const [countdownTime, setCountdownTime] = useState<number>(150000);

  const [isCountdownRunning, setCountdownRunning] = useState<boolean>(false);

  const [stopwatchTime, setStopwatchTime] = useState<number>(0);
  const [isStopwatchRunning, setStopwatchRunning] = useState<boolean>(false);

  const [shouldStartXY, setShouldStartXY] = useState<boolean>(false);
  const [shouldStartTabata, setShouldStartTabata] = useState<boolean>(false);

  const [xyState, setXYState] = useState<XYState>({
    round: 1,
    count: 60,
    isXYRunning: false,
    isPaused: false,
    message: null,
  });

  const [tabataState, setTabataState] = useState<TabataState>({
    currentRound: 1,
    workTime: 20,
    restTime: 10,
    isRunning: false,
    isPaused: false,
    isResting: false,
    message: null,
  });

  const [currentTimer, setCurrentTimer] = useState<string>('countdown');

  return (
    <TimerContext.Provider
      value={{
        countdownTime,
        setCountdownTime,
        isCountdownRunning,
        setCountdownRunning,
        stopwatchTime,
        setStopwatchTime,
        isStopwatchRunning,
        setStopwatchRunning,
        shouldStartXY,
        setShouldStartXY,
        shouldStartTabata,
        setShouldStartTabata,
        xyState,
        setXYState,
        tabataState,
        setTabataState,
        currentTimer,
        setCurrentTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
