import { SafeAreaView } from "react-native";
import uuid from "react-native-uuid";
import { TodoList } from "./src/components/todoList/TodoList";
import { useState } from "react";
import { TodoT } from "./src/models";
import { CreateTodo } from "./src/components/createTodo/CreateTodo";

export default function App() {
  const [todos, setTodos] = useState<TodoT[]>([]);

  const addTodo = (title: string) => {
    setTodos([...todos, { id: uuid.v4() as string, title, done: false }]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((e) => e.id !== id));
  };

  const doneTodo = (id: string) => {
    setTodos(
      todos.map((e) => {
        if (e.id !== id) return e;

        e.done = !e.done;
        return e;
      })
    );
  };

  return (
    <SafeAreaView>
      <CreateTodo addTodo={addTodo} />
      <TodoList data={todos} deleteTodo={deleteTodo} doneTodo={doneTodo} />
    </SafeAreaView>
  );
}
