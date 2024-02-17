import * as SQLite from 'expo-sqlite'

export const openDatabase = () => {
  console.log('opening db...')
  return SQLite.openDatabase('database.db')
}

export const setupDb = async (db: SQLite.SQLiteDatabase) => {
  await db.transactionAsync(async tx => {
    await tx.executeSqlAsync('create table if not exists users (id integer primary key not null, name text);')
  })
}
