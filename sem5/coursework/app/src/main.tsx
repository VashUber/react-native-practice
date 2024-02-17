import { SQLiteDatabase } from 'expo-sqlite'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setDatabase } from './redux/stores/db'
import { getUser } from './repo/query/user'
import { openDatabase, setupDb } from './repo/sqlite'
import { MainScreen } from './screens/main/Main'

export const Main = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let db: SQLiteDatabase

    const loadDb = async () => {
      db = openDatabase()
      await setupDb(db)
      dispatch(setDatabase(db))

      const user = await getUser(db)
      console.log(user)
    }

    loadDb()

    return () => {
      console.log('closing db...')
      db.closeSync()
    }
  }, [])

  return <MainScreen />
}
