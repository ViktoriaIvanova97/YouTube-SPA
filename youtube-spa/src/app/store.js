import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import authReducer from '../slices/authSlice'
import videosReducer from '../slices/videosSlice'
import favoritesReducer from '../slices/favoriteSlice'

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
}
const videoPersistConfig = {
  key: 'video',
  storage,
  whitelist: ['items'],
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  videos: persistReducer(videoPersistConfig, videosReducer),
  favorites: favoritesReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
