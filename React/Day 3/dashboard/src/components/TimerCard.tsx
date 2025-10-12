import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { start, pause, reset, tick } from '../store/slices/timerSlice';

export default function TimerCard() {
  const dispatch = useDispatch();
  const { seconds, isRunning } = useSelector((state: RootState) => state.timer);

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning) {
      interval = window.setInterval(() => {
        dispatch(tick());
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, dispatch]);

  return (
    <div style={cardStyle}>
      <h2>Timer</h2>
      <p style={{ fontSize: '2rem', margin: '20px 0' }}>{seconds}s</p>
      <button onClick={() => dispatch(start())} style={buttonStyle} disabled={isRunning}>
        Start
      </button>
      <button onClick={() => dispatch(pause())} style={buttonStyle} disabled={!isRunning}>
        Pause
      </button>
      <button onClick={() => dispatch(reset())} style={buttonStyle}>
        Reset
      </button>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  backgroundColor: '#f9f9f9',
};

const buttonStyle: React.CSSProperties = {
  margin: '0 5px',
  padding: '10px 20px',
  fontSize: '1rem',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: 'white',
};
