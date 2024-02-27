import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SQLiteDatabase } from 'expo-sqlite'

export const databaseSlice = createSlice({
  name: 'database',
  initialState: {
    db: null! as SQLiteDatabase
  },
  reducers: {
    setDatabase: (state, action: PayloadAction<SQLiteDatabase>) => {
      state.db = action.payload
    }
  }
})

export const { setDatabase } = databaseSlice.actions
export const databaseReducer = databaseSlice.reducer
