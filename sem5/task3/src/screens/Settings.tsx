import { StackScreenProps } from "@react-navigation/stack";
import { View, Text, Button, StyleSheet } from "react-native";
import Select from "react-native-picker-select";
import { RootParamList } from "../../@types";

import { Context, NavigationTypeT, navigationTypeOptions } from "../context";
import { useContext, useState } from "react";

export const SettingsScreen = (
  props: StackScreenProps<RootParamList, "Settings">
) => {
  const context = useContext(Context);
  const [selectedNavigationOption, setSelectedNavigationOption] =
    useState<NavigationTypeT>(context.navigationType);

  const options = navigationTypeOptions.map((e) => ({
    label: e,
    value: e,
  }));

  return (
    <View style={styles["settings-screen"]}>
      <Text>Настройки</Text>

      <View style={styles["input-wrapper"]}>
        <Text>Вид навигации</Text>
        <Select
          onValueChange={(v) => {
            if (!v || v === "null") {
              return;
            }

            setSelectedNavigationOption(v);
          }}
          style={{
            inputAndroid: styles.input,
            inputIOS: styles.input,
          }}
          items={options}
          value={selectedNavigationOption}
        />
      </View>

      <Button
        title="Сохранить"
        onPress={() => {
          context.setNavigationType(selectedNavigationOption);
        }}
      />

      <Button
        title="Главный экран"
        onPress={() => {
          props.navigation.navigate("Home");
        }}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#e6e6e6",
  },
  "input-wrapper": {
    gap: 2,
    width: "100%",
  },
  "settings-screen": {
    padding: 20,
    flex: 1,
    alignItems: "center",
  },
});
