import { memo, useContext } from "react";
import { View, Text } from "react-native";
import { Context } from "../state";

export const UserList = memo(() => {
  const userListRender = useContext(Context);

  return (
    <View>
      {userListRender.map((e) => (
        <View key={e.id}>
          <Text>{e.id}</Text>
          <Text>{e.name}</Text>
        </View>
      ))}
    </View>
  );
});
