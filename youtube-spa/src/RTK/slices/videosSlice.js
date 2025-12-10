import { createSlice } from '@reduxjs/toolkit'
import { searchVideos } from '..//../api/youtubeApi'
import { videoStatistics } from '..//../api/youtubeApi'

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
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.query = action.payload.query
        state.maxCount = action.payload.maxCount
        state.sort = action.payload.sort
        state.loading = false
      })
      .addCase(videoStatistics.fulfilled, (state, action) => {
        const statsMap = action.payload
        state.items = state.items.map((video) => ({
          ...video,
          statistics: statsMap[video.id.videoId],
        }))
        state.loading = false
      })
      .addMatcher(
        (action) =>
          action.type === searchVideos.pending.type ||
          action.type === videoStatistics.pending.type,
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addMatcher(
        (action) =>
          action.type === searchVideos.rejected.type ||
          action.type === videoStatistics.rejected.type,
        (state, action) => {
          state.loading = false
          state.error = action.payload
        }
      )
  },
})
export const { setQueryAndCount } = videoSlice.actions
export default videoSlice.reducer
