import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen, SettingsScreen } from "../screens";
import { RootParamList } from "../../@types";

const Drawer = createDrawerNavigator<RootParamList>();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};
