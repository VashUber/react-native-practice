import * as SQLite from 'expo-sqlite'

export const openDatabase = () => SQLite.openDatabase('database111112.db')

export const setupDb = async (db: SQLite.SQLiteDatabase) => {
  await db.transactionAsync(async tx => {
    await tx.executeSqlAsync('create table if not exists users (id integer primary key not null, name text);')
    await tx.executeSqlAsync(
      'create table if not exists settings (id integer primary key not null, music text, rounds integer, breath_holding integer, air_holding integer, breaths_count integer);'
    )
  })
}

export const database = {
  instance: null! as SQLite.SQLiteDatabase
}
