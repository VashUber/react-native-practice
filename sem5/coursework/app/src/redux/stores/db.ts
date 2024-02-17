import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SQLiteDatabase } from 'expo-sqlite'

export const userSlice = createSlice({
  name: 'db',
  initialState: {
    db: null! as SQLiteDatabase
  },
  reducers: {
    setDatabase: (state, action: PayloadAction<SQLiteDatabase>) => {
      state.db = action.payload
    }
  }
})

export const { setDatabase } = userSlice.actions
export const userReducer = userSlice.reducer
