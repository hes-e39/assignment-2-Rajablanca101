import React, { useEffect, useContext } from 'react';
import DisplayTime from '../generic/DisplayTime';
import Controls from '../generic/Controls';
import { TimerContext } from '../../AppContext';
import './Stopwatch.css';

const Stopwatch = ({ controls, index }) => {
  const {
    stopwatchTime,
    setStopwatchTime,
    stopwatchTargetValue,
    setStopwatchTargetValue,
    stopwatchIsRunning,
    stopwatchIsPaused,
    handleStopwatchAction,
    appControl,
    appTimerAction,
    appTimerIndex,
  } = useContext(TimerContext);

  useEffect(() => {
    let timer;
    if (stopwatchIsRunning && !stopwatchIsPaused && stopwatchTime < stopwatchTargetValue) {
      timer = setInterval(() => {
        setStopwatchTime((prev) => prev + 10);
      }, 10);
    } else if (stopwatchTime >= stopwatchTargetValue && stopwatchIsRunning) {
      handleStopwatchAction('Reset');
      appControl('Next');
    }

    return () => clearInterval(timer);
  }, [stopwatchTime, stopwatchIsRunning, stopwatchIsPaused, stopwatchTargetValue]);

  useEffect(() => {
    if (appTimerAction === 'Reset' || appTimerIndex === index) {
      handleStopwatchAction(appTimerAction);
    }
  }, [appTimerAction, appTimerIndex]);

  const handleTimeChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setStopwatchTargetValue(Number(value) * 1000);
    }
  };

  return (
    <div className="stopwatch-container">
      <DisplayTime milliseconds={stopwatchTime} uservalue={stopwatchTargetValue} />
      <div className="stopwatch-input-container">
        <input
          type="number"
          className="styled-input"
          placeholder="Enter time in seconds"
          value={stopwatchTargetValue / 1000}
          onChange={handleTimeChange}
        />
      </div>
      {controls && (
        <Controls
          onClick={(e) => handleStopwatchAction(e.target.value)}
          valueStart="Start"
          valuePause={stopwatchIsPaused ? 'Resume' : 'Pause'}
          valueStop="Reset"
        />
      )}
    </div>
  );
};

export default Stopwatch;