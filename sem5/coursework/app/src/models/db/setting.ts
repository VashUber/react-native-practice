import { songsMap } from '~/constants'

export interface SettingDbI {
  id: number
  music: keyof typeof songsMap
  rounds: number
  breaths_count: number
  breath_holding: number
  air_holding: number
}

export interface SettingsI {
  id: number
  music: keyof typeof songsMap
  rounds: number
  breathsCount: number
  breathHolding: number
  airHolding: number
}
