import { configureStore } from '@reduxjs/toolkit'

import { settingsReducer } from './stores/settings'
import { userReducer } from './stores/user'

export const store = configureStore({
  reducer: {
    userReducer,
    settingsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
