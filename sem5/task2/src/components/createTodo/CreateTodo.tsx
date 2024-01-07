import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type CreateTodoPropsT = {
  addTodo: (title: string) => void;
};

export const CreateTodo = ({ addTodo }: CreateTodoPropsT) => {
  const [newTodo, setNewTodo] = useState("");

  return (
    <View>
      <TextInput
        onSubmitEditing={() => {
          addTodo(newTodo);
          setNewTodo("");
        }}
        placeholder="new todo"
        style={styles.createTodoInput}
        value={newTodo}
        onChangeText={setNewTodo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  createTodoInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
});
