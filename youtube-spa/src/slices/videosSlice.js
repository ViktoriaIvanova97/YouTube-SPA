import { createSlice } from '@reduxjs/toolkit'
import { searchVideos } from '../api/youtubeApi'

const initialState = {
  items: [],
  loading: false,
  error: null,
  query: '',
  maxCount: 12,
  sort: 'relevance',
}

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setQueryAndCount: (state, action) => {
      state.query = action.payload.query
      state.maxCount = action.payload.maxCount
      state.sort = action.payload.sort
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchVideos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.query = action.payload.query
        state.maxCount = action.payload.maxCount
        state.sort = action.payload.sort
        state.loading = false
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})
export const { setQueryAndCount } = videoSlice.actions
export default videoSlice.reducer
