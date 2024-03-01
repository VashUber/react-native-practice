import { useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { Context, NavigationTypeT } from "./src/context";

import { StackNavigation } from "./src/navigation/Stack";
import { NativeStackNavigation } from "./src/navigation/NativeStack";
import { BottomTabNavigation } from "./src/navigation/BottomTab";
import { DrawerNavigation } from "./src/navigation/Drawer";

export default function App() {
  const [navigationType, setNavigationType] =
    useState<NavigationTypeT>("stack");

  const contextValue = {
    navigationType,
    setNavigationType: (v: NavigationTypeT) => setNavigationType(v),
  };

  let Navigation: () => JSX.Element = null!;
  switch (navigationType) {
    case "stack":
      Navigation = StackNavigation;
      break;
    case "native-stack":
      Navigation = NativeStackNavigation;
      break;
    case "bottom-tab":
      Navigation = BottomTabNavigation;
      break;
    case "drawer":
      Navigation = DrawerNavigation;
      break;
  }

  return (
    <>
      <StatusBar />
      <Context.Provider value={contextValue}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </Context.Provider>
    </>
  );
}
