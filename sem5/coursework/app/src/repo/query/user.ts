import { SQLiteDatabase } from 'expo-sqlite'

import { UserDbI } from '~/models/db'

export const getUser = async (db: SQLiteDatabase) => {
  let user: UserDbI | null = null

  await db.transactionAsync(async tx => {
    const { rows } = await tx.executeSqlAsync('select * from users')

    user = (rows[0] as UserDbI | undefined) ?? null
  })

  return user!
}
