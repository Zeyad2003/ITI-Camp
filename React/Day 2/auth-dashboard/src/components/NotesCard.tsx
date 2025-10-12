import { useState } from "react";

export default function NotesCard() {
  const [notes, setNotes] = useState<{ id: number; text: string; done: boolean }[]>([]);
  const [input, setInput] = useState("");

  const addNote = () => {
    if (input.trim()) {
      setNotes([...notes, { id: Date.now(), text: input, done: false }]);
      setInput("");
    }
  };

  const toggleNote = (id: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, done: !note.done } : note
    ));
  };

  return (
    <div style={cardStyle}>
      <h3>Notes</h3>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a note..."
        />
        <button onClick={addNote} style={{ marginLeft: "5px" }}>Add</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "15px" }}>
        {notes.map(note => (
          <li
            key={note.id}
            onClick={() => toggleNote(note.id)}
            style={{
              padding: "10px",
              margin: "5px 0",
              cursor: "pointer",
              backgroundColor: note.done ? "#90EE90" : "#f9f9f9",
              textDecoration: note.done ? "line-through" : "none",
              borderRadius: "4px",
            }}
          >
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center" as const,
  minWidth: "200px",
};
