import { createSlice } from '@reduxjs/toolkit'
import { searchVideos } from '../api/youtubeApi'

const initialState = {
  items: [],
  loading: false,
  error: null,
}

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchVideos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default videoSlice.reducer
