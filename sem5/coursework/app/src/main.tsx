import Icon from '@expo/vector-icons/Ionicons'
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { SQLiteDatabase } from 'expo-sqlite'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setDatabase } from '~/redux/stores/db'
import { setUser } from '~/redux/stores/user'
import { getUser } from '~/repo/query/user'
import { openDatabase, setupDb } from '~/repo/sqlite'
import { MainScreen, SettingsScreen } from '~/screens'

type IonicIconT = keyof typeof Icon.glyphMap

const Tab = createBottomTabNavigator()
const getTabScreenOptions = (icon: IonicIconT): BottomTabNavigationOptions => ({
  tabBarActiveTintColor: '#0077B6',
  tabBarInactiveTintColor: '#0077B6',
  tabBarIcon: ({ size, focused, color }) => {
    return <Icon name={focused ? icon : (`${icon}-outline` as IonicIconT)} size={size} color={color} />
  }
})

export const Main = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let db: SQLiteDatabase

    const loadDb = async () => {
      db = openDatabase()
      await setupDb(db)
      dispatch(setDatabase(db))

      const user = await getUser(db)
      if (user) {
        dispatch(setUser(user))
      }
      console.log(user)
    }

    loadDb()

    return () => {
      console.log('closing db...')
      db.closeSync()
    }
  }, [])

  return (
    <>
      <StatusBar style="auto" />

      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Tab.Screen name="Home" component={MainScreen} options={getTabScreenOptions('home')} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={getTabScreenOptions('settings')} />
      </Tab.Navigator>
    </>
  )
}
