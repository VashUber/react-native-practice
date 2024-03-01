import { createStackNavigator } from "@react-navigation/stack";
import { RootParamList } from "../../@types";
import { HomeScreen, SettingsScreen } from "../screens";

const Stack = createStackNavigator<RootParamList>();

export const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
