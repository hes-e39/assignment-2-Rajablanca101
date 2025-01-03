import React, { useEffect, useContext } from 'react';
import './XY.css';
import DisplayTime from '../generic/DisplayTime';
import DisplayRound from '../generic/DisplayRound';
import Controls from '../generic/Controls';
import { TimerContext } from '../../AppContext';

const XY = ({ controls, index }) => {
  const {
    xyTime,
    setXyTime,
    xyTimeValue,
    setXyTimeValue,
    xyRounds,
    xyCurrentRound,
    setXyCurrentRound,
    xyIsRunning,
    xyIsPaused,
    handleXYAction,
    appControl,
    appTimerAction,
    appTimerIndex,
  } = useContext(TimerContext);

  useEffect(() => {
    let timer;
    if (xyIsRunning && !xyIsPaused) {
      if (xyTime > 0) {
        timer = setTimeout(() => setXyTime((prev) => prev - 10), 10);
      } else if (xyCurrentRound < xyRounds) {
        setXyCurrentRound((prev) => prev + 1);
        setXyTime(xyTimeValue);
      } else {
        handleXYAction('Reset');
        appControl('Next');
      }
    }
    return () => clearTimeout(timer);
  }, [xyTime, xyIsRunning, xyIsPaused, xyCurrentRound, xyRounds, xyTimeValue]);

  useEffect(() => {
    if (appTimerAction === 'Reset' || appTimerIndex === index) {
      handleXYAction(appTimerAction);
    }
  }, [appTimerAction, appTimerIndex]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setXyTimeValue(Number(value) * 1000);
    }
  };

  return (
    <div className="xy-container">
      <DisplayTime milliseconds={xyTime} uservalue={xyTimeValue} />
      <DisplayRound round={xyCurrentRound} total={xyRounds} />
      <div className="xy-input-container">
        <label>Workout Time (seconds):</label>
        <input
          type="number"
          placeholder="Enter workout time"
          value={xyTimeValue / 1000 || ''}
          onChange={handleInputChange}
          className="xy-input"
        />
      </div>
      {controls && (
        <Controls
          onClick={(e) => handleXYAction(e.target.value)}
          valueStart="Start"
          valuePause={xyIsPaused ? 'Resume' : 'Pause'}
          valueStop="Reset"
        />
      )}
    </div>
  );
};

export default XY;