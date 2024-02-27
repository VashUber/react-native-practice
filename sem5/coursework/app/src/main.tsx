import Icon from '@expo/vector-icons/Ionicons'
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { SQLiteDatabase } from 'expo-sqlite'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { WithSafeArea } from './components/misc/WithSafeArea'

import { WithStatusBar } from '~/components/misc/WithStatusBar'
import { RootState } from '~/redux'
import { setUser } from '~/redux/stores/user'
import { getUser } from '~/repo/query/users'
import { database, openDatabase, setupDb } from '~/repo/sqlite'
import { LoadingScreen, MainScreen, RegistrationScreen, SettingsScreen } from '~/screens'

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
  const user = useSelector((state: RootState) => state.userReducer.user)
  const [isSetupDone, setIsSetupDone] = useState(false)

  useEffect(() => {
    let db: SQLiteDatabase

    const loadDb = async () => {
      db = openDatabase()
      await setupDb(db)
      database.instance = db

      const user = await getUser()
      if (user) {
        dispatch(setUser(user))
      }

      setIsSetupDone(true)
    }

    loadDb()

    return () => {
      db.closeSync()
    }
  }, [])

  let component: JSX.Element
  if (isSetupDone) {
    component = user ? (
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Tab.Screen name="Home" component={MainScreen} options={getTabScreenOptions('home')} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={getTabScreenOptions('settings')} />
      </Tab.Navigator>
    ) : (
      <WithSafeArea>
        <RegistrationScreen />
      </WithSafeArea>
    )
  } else {
    component = <LoadingScreen />
  }

  return <WithStatusBar>{component}</WithStatusBar>
}
