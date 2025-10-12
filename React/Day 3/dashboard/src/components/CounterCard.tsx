import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { increment, reset } from '../store/slices/counterSlice';

export default function CounterCard() {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter.value);

  return (
    <div style={cardStyle}>
      <h2>Counter</h2>
      <p style={{ fontSize: '2rem', margin: '20px 0' }}>{counter}</p>
      <button onClick={() => dispatch(increment())} style={buttonStyle}>
        Increment
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
