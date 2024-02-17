import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { UserDbI } from '~/models/db'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as UserDbI | null
  },
  reducers: {
    setUser: (state, action: PayloadAction<UserDbI>) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = userSlice.actions
export const userReducer = userSlice.reducer
