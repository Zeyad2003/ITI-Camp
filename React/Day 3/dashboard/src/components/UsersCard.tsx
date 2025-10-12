import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchUsers, fetchUserById } from '../store/slices/usersSlice';

export default function UsersCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSearch = () => {
    if (userId.trim() === '') {
      dispatch(fetchUsers());
    } else {
      dispatch(fetchUserById(Number(userId)));
    }
  };

  return (
    <div style={cardStyle}>
      <h2>Users List</h2>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter user ID..."
          style={inputStyle}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} style={buttonStyle}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul style={{ listStyle: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
          {users.map((user) => (
            <li
              key={user.id}
              style={{
                padding: '10px',
                margin: '5px 0',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <strong>{user.name}</strong>
              <br />
              <small>{user.email}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  backgroundColor: '#f9f9f9',
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  fontSize: '1rem',
  marginRight: '5px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  width: '60%',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '1rem',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: 'white',
};
