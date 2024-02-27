import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { exhalationTime, inhaleTime } from '~/constants'
import { StageI } from '~/models/training'

const defaultStagesPreset: StageI[] = [
  {
    title: '30 вдохов',
    type: 'breathing',
    time: (inhaleTime + exhalationTime) * 30
  },
  {
    title: 'задержка дыхания',
    type: 'breath-holding',
    time: 60 * 1000
  },
  {
    title: 'задержка воздуха',
    type: 'air-holding',
    time: 15 * 1000 + inhaleTime + exhalationTime
  }
]

export const settingsSlice = createSlice({
  name: 'user',
  initialState: {
    settings: {
      stages: defaultStagesPreset
    }
  },
  reducers: {
    setSettings: (state, action: PayloadAction<unknown>) => {}
  }
})

export const { setSettings } = settingsSlice.actions
export const userReducer = settingsSlice.reducer
