import { database } from '../sqlite'

import { songs } from '~/constants'
import { SettingDbI } from '~/models/db/setting'

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

export const updateSettings = async (settings: SettingDbI) => {
  await database.instance.transactionAsync(async tx => {
    await tx.executeSqlAsync('update settings set rounds=?,breaths_count=?,breath_holding=?,air_holding=?,music=?', [
      settings.rounds,
      settings.breaths_count,
      settings.breath_holding,
      settings.air_holding,
      settings.music
    ])
  })
}
