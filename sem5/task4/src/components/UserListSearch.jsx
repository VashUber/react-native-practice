import { memo, useState } from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";

export const UserListSearch = memo(({ runSearch }) => {
  const [search, setSearch] = useState("");

  return (
    <View style={style["user-list-search"]}>
      <TextInput style={style.input} value={search} onChangeText={setSearch} />
      <Button
        title="Поиск"
        onPress={() => {
          runSearch(search);
        }}
      />
    </View>
  );
});

const style = StyleSheet.create({
  "user-list-search": {
    flexDirection: "row",
  },
  input: {
    flexGrow: 1,
    borderWidth: 1,
    padding: 10,
  },
});
