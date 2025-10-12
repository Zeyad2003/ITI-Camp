import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: number;
  text: string;
  isDone: boolean;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<string>) => {
      state.notes.push({
        id: Date.now(),
        text: action.payload,
        isDone: false,
      });
    },
    toggleNote: (state, action: PayloadAction<number>) => {
      const note = state.notes.find((n) => n.id === action.payload);
      if (note) {
        note.isDone = !note.isDone;
      }
    },
  },
});

export const { addNote, toggleNote } = notesSlice.actions;
export default notesSlice.reducer;
