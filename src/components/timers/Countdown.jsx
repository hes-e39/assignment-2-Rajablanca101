import React, { useEffect, useContext } from 'react';
import DisplayTime from '../generic/DisplayTime';
import Controls from '../generic/Controls';
import { TimerContext } from '../../AppContext';
import './Countdown.css';

const Countdown = ({ controls, index }) => {
  const {
    countdownTime,
    setCountdownTime,
    countdownValue,
    setCountdownValue,
    countdownIsRunning,
    countdownIsPaused,
    handleCountdownAction,
    appControl,
    appTimerAction,
    appTimerIndex,
  } = useContext(TimerContext);

  useEffect(() => {
    let timer;
    if (countdownIsRunning && !countdownIsPaused && countdownTime > 0) {
      timer = setTimeout(() => setCountdownTime((prev) => prev - 10), 10);
    } else if (countdownTime <= 0 && countdownIsRunning) {
      handleCountdownAction('Reset');
      appControl('Next');
    }
    return () => clearTimeout(timer);
  }, [countdownTime, countdownIsRunning, countdownIsPaused]);

  useEffect(() => {
    if (appTimerAction === 'Reset' || appTimerIndex === index) {
      handleCountdownAction(appTimerAction);
    }
  }, [appTimerAction, appTimerIndex]);

  const handleTimeChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      const milliseconds = Number(value) * 1000;
      setCountdownValue(milliseconds);
      if (!countdownIsRunning) {
        setCountdownTime(milliseconds);
      }
    }
  };

  return (
    <div className="countdown-container">
      <DisplayTime milliseconds={countdownTime} uservalue={countdownValue} />
      <div className="countdown-input-container">
        <input
          type="number"
          value={countdownValue / 1000 || ''}
          onChange={handleTimeChange}
          className="countdown-input"
        />
      </div>
      {controls && (
        <Controls
          onClick={(e) => handleCountdownAction(e.target.value)}
          valueStart="Start"
          valuePause={countdownIsPaused ? 'Resume' : 'Pause'}
          valueStop="Reset"
        />
      )}
    </div>
  );
};

export default Countdown;