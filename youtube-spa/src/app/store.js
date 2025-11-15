import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import authReducer from '../slices/authSlice'

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer), // ⚡
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
