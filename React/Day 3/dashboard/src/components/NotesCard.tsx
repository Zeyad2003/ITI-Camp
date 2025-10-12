import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addNote, toggleNote } from '../store/slices/notesSlice';

export default function NotesCard() {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const [noteText, setNoteText] = useState('');

  const handleAddNote = () => {
    if (noteText.trim()) {
      dispatch(addNote(noteText));
      setNoteText('');
    }
  };

  return (
    <div style={cardStyle}>
      <h2>Notes</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Enter a note..."
          style={inputStyle}
          onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
        />
        <button onClick={handleAddNote} style={buttonStyle}>
          Add Note
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => dispatch(toggleNote(note.id))}
            style={{
              padding: '10px',
              margin: '5px 0',
              cursor: 'pointer',
              backgroundColor: note.isDone ? '#d4edda' : '#fff',
              textDecoration: note.isDone ? 'line-through' : 'none',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          >
            {note.text}
          </li>
        ))}
      </ul>
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
