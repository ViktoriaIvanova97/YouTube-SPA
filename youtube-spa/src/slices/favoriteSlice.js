import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  favorite:[]
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorite.push({
        id: uuidv4(),
        query: action.payload.query,
        name: action.payload.name,
        sort: action.payload.sort,
        maxCount: action.payload.maxCount,
      });
    },
    updateFavorite: (state, action) => {
      const { id, query, name, sort, maxCount } = action.payload;
      const index = state.favorite.findIndex(f => f.id === id);
      if (index !== -1) {
        state.favorite[index] = { id, query, name, sort, maxCount };
      }
    },
  },
});

export const { addFavorite ,updateFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
