import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { exhalationTime, inhaleTime } from '~/constants'
import { SettingsI } from '~/models/db'
import { StageI } from '~/models/training'

export const settingsSlice = createSlice({
  name: 'user',
  initialState: {
    stages: [] as StageI[],
    settings: {
      id: 0,
      music: '',
      rounds: 0,
      breathsCount: 0,
      breathHolding: 0,
      airHolding: 0
    }
  },
  reducers: {
    setSettings: (state, action: PayloadAction<SettingsI>) => {
      const { payload } = action

      state.settings.id = payload.id
      state.settings.music = payload.music
      state.settings.rounds = payload.rounds
      state.settings.breathsCount = payload.breathsCount
      state.settings.breathHolding = payload.breathHolding
      state.settings.airHolding = payload.airHolding
      state.stages = [
        {
          title: `${payload.breathsCount} вдохов`,
          type: 'breathing',
          time: (inhaleTime + exhalationTime) * payload.breathsCount
        },
        {
          title: `Выдохните весь оставшийся воздух. Задержите дыхание на ${payload.breathHolding / 1000} секунд`,
          type: 'breath-holding',
          time: payload.breathHolding
        },
        {
          title: `Сделайте глубокий вдох. Задержите дыхание на ${payload.airHolding / 1000} секунд`,
          type: 'air-holding',
          time: payload.airHolding + inhaleTime + exhalationTime
        },
        {
          title: `Приготовьтесь к следующему раунду`,
          type: 'chill',
          time: 5 * 1000
        }
      ]
    }
  }
})

export const { setSettings } = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
