import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorite:[]
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorite.push(action.payload);
    },
  },
});

export const { addFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
