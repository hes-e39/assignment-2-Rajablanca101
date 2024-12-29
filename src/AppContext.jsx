import React, { useState, useEffect, createContext } from 'react';
import Stopwatch from './components/timers/Stopwatch';
import Countdown from './components/timers/Countdown';
import XY from './components/timers/XY';
import Tabata from './components/timers/Tabata';

export const TimerContext = createContext({});

export const AppContext = ({ children }) => {
  const [timers, setTimers] = useState([]);
  const [timersChanged, setTimersChanged] = useState(0);
  const [appTimerAction, setAppTimerAction] = useState('');
  const [appTimerIndex, setAppTimerIndex] = useState(-1);

  // Stopwatch states
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchTargetValue, setStopwatchTargetValue] = useState(0);
  const [stopwatchIsRunning, setStopwatchIsRunning] = useState(false);
  const [stopwatchIsPaused, setStopwatchIsPaused] = useState(false);

  // Countdown states
  const [countdownTime, setCountdownTime] = useState(0);
  const [countdownValue, setCountdownValue] = useState(0);
  const [countdownIsRunning, setCountdownIsRunning] = useState(false);
  const [countdownIsPaused, setCountdownIsPaused] = useState(false);

  // XY states
  const [xyTime, setXyTime] = useState(0);
  const [xyTimeValue, setXyTimeValue] = useState(0);
  const [xyRounds, setXyRounds] = useState(2);
  const [xyCurrentRound, setXyCurrentRound] = useState(1);
  const [xyIsRunning, setXyIsRunning] = useState(false);
  const [xyIsPaused, setXyIsPaused] = useState(false);

  // Tabata states
  const [tabataCountdown, setTabataCountdown] = useState(0);
  const [tabataRestdown, setTabataRestdown] = useState(0);
  const [tabataTotalCountdown, setTabataTotalCountdown] = useState(0);
  const [tabataTotalRestdown, setTabataTotalRestdown] = useState(0);
  const [tabataRounds, setTabataRounds] = useState(0);
  const [tabataCurrentRound, setTabataCurrentRound] = useState(1);
  const [tabataIsRunning, setTabataIsRunning] = useState(false);
  const [tabataIsPaused, setTabataIsPaused] = useState(false);

  useEffect(() => {}, [timersChanged]);

  const getNextValidIndex = (index) => {
    for (let i = index + 1; i < timers.length; i++) {
      if (timers[i].valid) {
        return i;
      }
    }
    return false;
  };

  const appControl = (value) => {
    if (value === 'Reset') {
      setAppTimerAction(value);
    } else if (value === 'Start') {
      setAppTimerAction(value);
      const appTimerNextIndex = getNextValidIndex(appTimerIndex);
      if (appTimerNextIndex === false) {
        setAppTimerIndex(0);
      } else {
        setAppTimerIndex(appTimerNextIndex);
      }
    } else if (value === 'Stop') {
      setAppTimerAction(value);
    } else if (value === 'Pause') {
      setAppTimerAction(value);
    } else if (value === 'Resume') {
      setAppTimerAction(value);
    } else if (value === 'Next') {
      setAppTimerAction('Start');
      const appTimerNextIndex = getNextValidIndex(appTimerIndex);
      if (appTimerNextIndex === false) {
        setAppTimerIndex(-1);
      } else {
        setAppTimerIndex(appTimerNextIndex);
      }
    }
  };

  const addTimer = (title) => {
    let queue = timers;
    const index = queue.length;
    const componentTimer = {
      Stopwatch: <Stopwatch controls={true} index={index} />,
      Countdown: <Countdown controls={true} index={index} />,
      XY: <XY controls={true} index={index} />,
      Tabata: <Tabata controls={true} index={index} />,
    };

    queue.push({
      title: title,
      data: null,
      component: componentTimer[title],
      valid: true,
      index: index,
    });
    setTimers(queue);
    setTimersChanged(timersChanged + 1);
  };

  const updateTimer = (index, data) => {
    let queue = timers;
    queue[index].valid = true;
    queue[index].data = data;
    setTimers(queue);
    setTimersChanged(timersChanged + 1);
  };

  const deleteTimer = (index) => {
    let queue = timers;
    queue[index].valid = false;
    queue[index].data = null;
    setTimers(queue);
    setTimersChanged(timersChanged + 1);
  };

  // Stopwatch methods
  const handleStopwatchAction = (action) => {
    switch (action) {
      case 'Start':
        setStopwatchTime(0);
        setStopwatchIsRunning(true);
        setStopwatchIsPaused(false);
        break;
      case 'Pause':
        setStopwatchIsPaused(true);
        break;
      case 'Resume':
        setStopwatchIsPaused(false);
        break;
      case 'Reset':
        setStopwatchTime(0);
        setStopwatchTargetValue(0);
        setStopwatchIsRunning(false);
        setStopwatchIsPaused(false);
        break;
      default:
        break;
    }
  };

  // Countdown methods
  const handleCountdownAction = (action) => {
    switch (action) {
      case 'Start':
        if (countdownValue > 0) {
          setCountdownTime(countdownValue);
          setCountdownIsRunning(true);
          setCountdownIsPaused(false);
        }
        break;
      case 'Pause':
        setCountdownIsPaused(true);
        break;
      case 'Resume':
        setCountdownIsPaused(false);
        break;
      case 'Reset':
        setCountdownTime(0);
        setCountdownValue(0);
        setCountdownIsRunning(false);
        setCountdownIsPaused(false);
        break;
      default:
        break;
    }
  };

  // XY methods
  const handleXYAction = (action) => {
    switch (action) {
      case 'Start':
        setXyTime(xyTimeValue);
        setXyCurrentRound(1);
        setXyIsRunning(true);
        setXyIsPaused(false);
        break;
      case 'Pause':
        setXyIsPaused(true);
        break;
      case 'Resume':
        setXyIsPaused(false);
        break;
      case 'Reset':
        setXyTime(0);
        setXyTimeValue(0);
        setXyCurrentRound(1);
        setXyIsRunning(false);
        setXyIsPaused(false);
        break;
      default:
        break;
    }
  };

  // Tabata methods
  const handleTabataAction = (action) => {
    switch (action) {
      case 'Start':
        setTabataCountdown(tabataTotalCountdown);
        setTabataRestdown(tabataTotalRestdown);
        setTabataCurrentRound(1);
        setTabataIsRunning(true);
        setTabataIsPaused(false);
        break;
      case 'Pause':
        setTabataIsPaused(true);
        break;
      case 'Resume':
        setTabataIsPaused(false);
        break;
      case 'Reset':
        setTabataCountdown(0);
        setTabataRestdown(0);
        setTabataRounds(0);
        setTabataCurrentRound(1);
        setTabataIsRunning(false);
        setTabataIsPaused(false);
        break;
      default:
        break;
    }
  };

  return (
    <TimerContext.Provider
      value={{
        // Timer management
        timers,
        addTimer,
        updateTimer,
        deleteTimer,
        appControl,
        appTimerAction,
        appTimerIndex,

        // Stopwatch state and methods
        stopwatchTime,
        setStopwatchTime,
        stopwatchTargetValue,
        setStopwatchTargetValue,
        stopwatchIsRunning,
        stopwatchIsPaused,
        handleStopwatchAction,

        // Countdown state and methods
        countdownTime,
        setCountdownTime,
        countdownValue,
        setCountdownValue,
        countdownIsRunning,
        countdownIsPaused,
        handleCountdownAction,

        // XY state and methods
        xyTime,
        setXyTime,
        xyTimeValue,
        setXyTimeValue,
        xyRounds,
        setXyRounds,
        xyCurrentRound,
        setXyCurrentRound,
        xyIsRunning,
        xyIsPaused,
        handleXYAction,

        // Tabata state and methods
        tabataCountdown,
        setTabataCountdown,
        tabataRestdown,
        setTabataRestdown,
        tabataTotalCountdown,
        setTabataTotalCountdown,
        tabataTotalRestdown,
        setTabataTotalRestdown,
        tabataRounds,
        setTabataRounds,
        tabataCurrentRound,
        setTabataCurrentRound,
        tabataIsRunning,
        tabataIsPaused,
        handleTabataAction,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default AppContext;