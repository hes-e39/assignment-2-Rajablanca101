import React from 'react';
import Stopwatch from '../components/timers/Stopwatch';
import Countdown from '../components/timers/Countdown';
import XY from '../components/timers/XY';
import Tabata from '../components/timers/Tabata';
import './TimersView.css';

const TimersView = () => {
  const timers = [
    { title: 'Stopwatch', C: <Stopwatch controls={true} index={-1} /> },
    { title: 'Countdown', C: <Countdown controls={true} index={-1} /> },
    { title: 'XY', C: <XY controls={true} index={-1} /> },
    { title: 'Tabata', C: <Tabata controls={true} index={-1} /> },
  ];

  return (
    < >
      {timers.map((timer) => (
        <div className="timer" key={`timer-${timer.title}`}>
          <div className="timer-title">{timer.title}</div>
          {timer.C}
        </div>
      ))}
    </>
  );
};

export default TimersView;
