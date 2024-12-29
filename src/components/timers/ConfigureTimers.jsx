import React from 'react';
import './ConfigureTimers.css';

import Stopwatch from './Stopwatch';
import Countdown from './Countdown';
import XY from './XY';
import Tabata from './Tabata';
import Button from '../generic/Button';

const ConfigureTimers = ({ timers, handleTimerUpdate, handleTimerDelete }) => {
  return (
    <div className="configure-timers">
      {timers
        .filter((e) => e.valid)
        .map((timer) => (
          <div
            className="configure-timer"
            key={`timer-${timer.title}-${timer.index}`}
          >
            <div className="configure-timer-title">{timer.title}</div>
            {timer.component}
            <div className="configure-timer-actions">
              <Button
                displayName="Delete"
                value={timer.index}
                className="btn btn-danger"
                onClick={handleTimerDelete}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ConfigureTimers;
