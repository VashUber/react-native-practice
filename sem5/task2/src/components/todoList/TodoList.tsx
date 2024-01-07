import { FlatList, StyleSheet } from "react-native";
import { TodoT } from "../../models";
import { Todo } from "../todo/Todo";

type TodoListPropsT = {
  data: TodoT[];
  deleteTodo: (id: string) => void;
  doneTodo: (id: string) => void;
};

export const TodoList = ({ data, deleteTodo, doneTodo }: TodoListPropsT) => {
  return (
    <FlatList
      style={styles.todoList}
      data={data}
      contentContainerStyle={{ gap: 20 }}
      renderItem={({ item }) => (
        <Todo data={item} deleteTodo={deleteTodo} doneTodo={doneTodo} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  todoList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
