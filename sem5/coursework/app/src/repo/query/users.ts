import { database } from '../sqlite'

import { UserDbI } from '~/models/db'

export const getUser = async (): Promise<UserDbI | null> => {
  let user: UserDbI | null = null

  await database.instance.transactionAsync(async tx => {
    const { rows } = await tx.executeSqlAsync('select * from users')

    const row = rows[0] as UserDbI | undefined
    if (row) {
      user = row
    }
  })

  return user
}

export const createUser = async (user: Omit<UserDbI, 'id'>) => {
  await database.instance.transactionAsync(async tx => {
    await tx.executeSqlAsync('insert into users(name) values(?)', [user.name])
  })
}

export const updateUser = async (user: UserDbI) => {
  await database.instance.transactionAsync(async tx => {
    await tx.executeSqlAsync('update users set name=? where id = ?', [user.name, user.id])
  })
}
