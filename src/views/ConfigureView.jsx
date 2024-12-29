import React, { useContext } from 'react';
import { TimerContext } from '../AppContext';

import ConfigureTimers from '../components/timers/ConfigureTimers';
import ConfigureTimer from '../components/timers/ConfigureTimer';
import Controls from '../components/generic/Controls';
import Button from '../components/generic/Button';
import './ConfigureView.css';

const ConfigureView = () => {
  const {
    timers,
    addTimer,
    updateTimer,
    deleteTimer,
    appControl,
    appTimerAction,
  } = useContext(TimerContext);

  const handleTimerAdd = (event) => {
    const timer = event.target.value;
    addTimer(timer);
  };

  const handleTimerUpdate = (event) => {
    const timerIndex = event.target.value;
    updateTimer(timerIndex);
  };

  const handleTimerDelete = (event) => {
    const timerIndex = event.target.value;
    deleteTimer(timerIndex);
  };

  const handleAppControlClick = (event) => {
    const value = event.target.value;
    appControl(value);
  };

  return (
    <div>
      <ConfigureTimers
        timers={timers}
        handleTimerUpdate={handleTimerUpdate}
        handleTimerDelete={handleTimerDelete}
      />
      <ConfigureTimer handleTimerAdd={handleTimerAdd} />
    </div>
  );
};

export default ConfigureView;
