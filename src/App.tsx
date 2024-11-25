import './App.css';
import { TimerProvider } from './components/timers/TimerContext';
import TimersView from './views/TimersView';

function App() {
  return (
    <TimerProvider>
      <div className="app-container">
        <TimersView />
      </div>
    </TimerProvider>
  );
}

export default App;
