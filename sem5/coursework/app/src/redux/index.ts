import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from './stores/user'

export const store = configureStore({
  reducer: {
    userReducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
