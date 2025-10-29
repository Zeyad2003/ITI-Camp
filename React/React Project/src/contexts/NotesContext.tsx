import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type NotePriority = 'important' | 'normal' | 'delayed';

export interface Note {
  id: string;
  text: string;
  priority: NotePriority;
  createdAt: Date;
}

interface NotesContextType {
  notes: Note[];
  addNote: (text: string, priority: NotePriority) => void;
  deleteNote: (id: string) => void;
  changePriority: (id: string, newPriority: NotePriority) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const parsed = JSON.parse(savedNotes);
      setNotes(parsed.map((note: Note) => ({
        ...note,
        createdAt: new Date(note.createdAt)
      })));
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  const addNote = (text: string, priority: NotePriority) => {
    const newNote: Note = {
      id: Date.now().toString(),
      text,
      priority,
      createdAt: new Date(),
    };
    setNotes(prev => [...prev, newNote]);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const changePriority = (id: string, newPriority: NotePriority) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, priority: newPriority } : note
      )
    );
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, changePriority }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
