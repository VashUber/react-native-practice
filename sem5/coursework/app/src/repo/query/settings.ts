import { database } from '../sqlite'

import { songs } from '~/constants'
import { SettingDbI, SettingsI } from '~/models/db'

const defaultSetting = {
  id: 1,
  music: songs[0].type,
  rounds: 3,
  breaths_count: 30,
  breath_holding: 60 * 1000,
  air_holding: 15 * 1000
}

export const createSettings = async (settings: SettingDbI = defaultSetting) => {
  await database.instance.transactionAsync(async tx => {
    await tx.executeSqlAsync(
      'insert into settings(rounds,breaths_count,breath_holding,air_holding,music) values(?,?,?,?,?)',
      [settings.rounds, settings.breaths_count, settings.breath_holding, settings.air_holding, settings.music]
    )
  })
}

export const updateSettings = async (settings: SettingsI) => {
  await database.instance.transactionAsync(async tx => {
    await tx.executeSqlAsync('update settings set rounds=?,breaths_count=?,breath_holding=?,air_holding=?,music=?', [
      settings.rounds,
      settings.breathsCount,
      settings.breathHolding,
      settings.airHolding,
      settings.music
    ])
  })
}

export const getSettings = async () => {
  let settings: SettingDbI = null!

  await database.instance.transactionAsync(async tx => {
    const { rows } = await tx.executeSqlAsync('select * from settings')

    const row = rows[0] as SettingDbI | undefined
    if (row) {
      settings = row
    }
  })

  const s: SettingsI = {
    id: settings.id,
    rounds: settings.rounds,
    breathsCount: settings.breaths_count,
    breathHolding: settings.breath_holding,
    airHolding: settings.air_holding,
    music: settings.music
  }

  return s
}
