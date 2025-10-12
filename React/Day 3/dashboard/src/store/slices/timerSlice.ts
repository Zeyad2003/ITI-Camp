import { createSlice } from '@reduxjs/toolkit';

interface TimerState {
  seconds: number;
  isRunning: boolean;
}

const initialState: TimerState = {
  seconds: 0,
  isRunning: false,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    start: (state) => {
      state.isRunning = true;
    },
    pause: (state) => {
      state.isRunning = false;
    },
    tick: (state) => {
      if (state.isRunning) {
        state.seconds += 1;
      }
    },
    reset: (state) => {
      state.seconds = 0;
      state.isRunning = false;
    },
  },
});

export const { start, pause, tick, reset } = timerSlice.actions;
export default timerSlice.reducer;
