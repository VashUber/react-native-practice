import { View, Text, Button, StyleSheet } from "react-native";
import { TodoT } from "../../models";

type TodoPropsI = {
  data: TodoT;
  deleteTodo: (id: string) => void;
  doneTodo: (id: string) => void;
};

export const Todo = ({ data, deleteTodo, doneTodo }: TodoPropsI) => {
  return (
    <View style={styles.todo}>
      <Text
        style={{
          ...styles.todoTitle,
          textDecorationLine: data.done ? "line-through" : "none",
        }}
      >
        {data.title}
      </Text>

      <View style={styles.todoButtons}>
        <Button
          title="Delete"
          color="red"
          onPress={() => deleteTodo(data.id)}
        />
        <Button title="Done" onPress={() => doneTodo(data.id)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },

  todoTitle: {
    fontSize: 24,
  },

  todoButtons: {
    flex: 1,
    flexDirection: "row",
  },
});
