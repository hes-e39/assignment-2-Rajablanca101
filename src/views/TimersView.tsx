import styled from 'styled-components';
import Countdown from '../components/timers/CountDown';
import StopWatch from '../components/timers/StopWatch';
import XY from '../components/timers/XY';
import Tabata from '../components/timers/Tabata';

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TimersView = () => {
  return (
    <Timers>
      <Countdown />
      <StopWatch />
      <XY timePerRound={6} rounds={2} />
      <Tabata work={20} rest={10} rounds={8} />
    </Timers>
  );
};

export default TimersView;
