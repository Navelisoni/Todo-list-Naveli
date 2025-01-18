import { createSlice } from '@reduxjs/toolkit';

export const asideSlice = createSlice({
  name: 'aside',
  initialState: {
    isOpen: true,
  },
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggle } = asideSlice.actions;

export default asideSlice.reducer;