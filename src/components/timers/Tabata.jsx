import React, { useEffect, useContext } from 'react';
import './Tabata.css';
import DisplayTime from '../generic/DisplayTime';
import Controls from '../generic/Controls';
import { TimerContext } from '../../AppContext';

const Tabata = ({ controls, index }) => {
  const {
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
    appControl,
    appTimerAction,
    appTimerIndex,
  } = useContext(TimerContext);

  useEffect(() => {
    if (!tabataIsRunning || tabataIsPaused) return;

    const timer = setTimeout(() => {
      if (tabataCountdown > 0) {
        setTabataCountdown((prev) => prev - 10);
      } else if (tabataRestdown > 0) {
        setTabataRestdown((prev) => prev - 10);
      } else if (tabataCurrentRound < tabataRounds) {
        setTabataCurrentRound((prev) => prev + 1);
        setTabataCountdown(tabataTotalCountdown);
        setTabataRestdown(tabataTotalRestdown);
      } else {
        handleTabataAction('Reset');
        appControl('Next');
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [
    tabataCountdown,
    tabataRestdown,
    tabataIsRunning,
    tabataIsPaused,
    tabataCurrentRound,
    tabataRounds,
    tabataTotalCountdown,
    tabataTotalRestdown,
  ]);

  useEffect(() => {
    if (appTimerAction === 'Reset' || appTimerIndex === index) {
      handleTabataAction(appTimerAction);
    }
  }, [appTimerAction, appTimerIndex]);

  const handleInputChange = (type, value) => {
    const val = Number(value);
    if (val >= 0) {
      if (type === 'countdown') setTabataTotalCountdown(val * 1000);
      if (type === 'restdown') setTabataTotalRestdown(val * 1000);
      if (type === 'rounds') setTabataRounds(val);
    }
  };

  return (
    <div className="tabata-container">
      <DisplayTime milliseconds={tabataCountdown} uservalue={tabataTotalCountdown} />
      <DisplayTime milliseconds={tabataRestdown} uservalue={tabataTotalRestdown} />
      <div className="round-display">
        {tabataRounds ? `Round ${tabataCurrentRound} of ${tabataRounds}` : 'Number of Rounds'}
      </div>
      <div className="tabata-inputs">
        {[
          {
            label: 'Workout Time (seconds):',
            value: tabataTotalCountdown / 1000,
            type: 'countdown',
          },
          {
            label: 'Rest Time (seconds):',
            value: tabataTotalRestdown / 1000,
            type: 'restdown',
          },
          { label: 'Rounds:', value: tabataRounds, type: 'rounds' },
        ].map(({ label, value, type }) => (
          <div key={type}>
            <label>{label}</label>
            <input
              type="number"
              value={value || ''}
              onChange={(e) => handleInputChange(type, e.target.value)}
            />
          </div>
        ))}
      </div>
      {controls && (
        <Controls
          onClick={(e) => handleTabataAction(e.target.value)}
          valueStart="Start"
          valuePause={tabataIsPaused ? 'Resume' : 'Pause'}
          valueStop="Reset"
        />
      )}
    </div>
  );
};

export default Tabata;