import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import CounterCard from '../components/CounterCard';
import TimerCard from '../components/TimerCard';
import NotesCard from '../components/NotesCard';
import UsersCard from '../components/UsersCard';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.username);

  return (
    <div>
      <header style={headerStyle}>
        <h1>Dashboard</h1>
        <div>
          <span style={{ marginRight: '15px' }}>Welcome, {username}!</span>
          <button onClick={() => dispatch(logout())} style={buttonStyle}>
            Logout
          </button>
        </div>
      </header>
      <div style={gridStyle}>
        <CounterCard />
        <TimerCard />
        <NotesCard />
        <UsersCard />
      </div>
    </div>
  );
}

const headerStyle: React.CSSProperties = {
  backgroundColor: '#282c34',
  color: 'white',
  padding: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '1rem',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#dc3545',
  color: 'white',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px',
  padding: '20px',
  maxWidth: '1400px',
  margin: '0 auto',
};
