import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootParamList } from "../../@types";
import { HomeScreen, SettingsScreen } from "../screens";

const Stack = createNativeStackNavigator<RootParamList>();

export const NativeStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
