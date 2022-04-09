import { createSlice } from '@reduxjs/toolkit';

export const announcementSlice = createSlice({
  name: 'announcement',
  initialState: {
    activeIndex: 0,
    reset: false
  },
  reducers: {
    setActiveIndex: (state, action) => {
      state.activeIndex = action.payload.activeIndex;
    },
    setReset: (state, action) => {
      state.reset = action.payload.reset;
    }
  }
});

export const { setActiveIndex, setReset } = announcementSlice.actions;

export const selectActiveIndex = state => state.announcement.activeIndex;
export const selectReset = state => state.announcement.reset;

export default announcementSlice.reducer;