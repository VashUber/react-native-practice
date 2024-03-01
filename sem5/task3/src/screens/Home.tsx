import { StackScreenProps } from "@react-navigation/stack";
import { View, Text, Button } from "react-native";
import { RootParamList } from "../../@types";

export const HomeScreen = (props: StackScreenProps<RootParamList, "Home">) => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Экран настроек"
        onPress={() => {
          props.navigation.navigate("Settings");
        }}
      />
    </View>
  );
};
