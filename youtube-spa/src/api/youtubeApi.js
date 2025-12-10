import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const API_AUTH = import.meta.env.VITE_AUTH
const API_YOUTUBE = import.meta.env.VITE_YOUTUBE

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, email, password, gender, age }, thunkAPI) => {
    try {
      const res = await fetch(`${API_AUTH}/users/register`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, gender, age }),
      })
      const response = await res.json()

      if (!res.ok) {
        throw new Error(response.message)
      }

      localStorage.setItem('token', response.token)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await fetch(`${API_AUTH}/auth/login`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const response = await res.json()

      if (!res.ok) {
        throw new Error(response.message)
      }

      localStorage.setItem('token', response.token)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const searchVideos = createAsyncThunk(
  'videos/searchVideos',
  async ({ query, maxCount, sort }, thunkAPI) => {
    try {
      const response = await axios.get(`${API_YOUTUBE}/v3/search`, {
        params: {
          part: 'snippet',
          type: 'video',
          maxResults: maxCount,
          q: query,
          order: sort,
          key: API_KEY,
        },
      })
      const videoIds = response.data.items.map((item) => item.id.videoId)

      thunkAPI.dispatch(videoStatistics(videoIds))

      return { items: response.data.items, query, maxCount, sort }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error?.message || error.message
      )
    }
  }
)

export const videoStatistics = createAsyncThunk(
  'videos/fetchVideoStatistics',
  async (videoIds, thunkAPI) => {
    try {
      const response = await axios.get(`${API_YOUTUBE}/v3/videos`, {
        params: {
          part: 'statistics',
          id: videoIds.join(','),
          key: API_KEY,
        },
      })

      const statsMap = {}
      response.data.items.forEach((video) => {
        statsMap[video.id] = video.statistics
      })

      return statsMap
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error?.message || error.message
      )
    }
  }
)
