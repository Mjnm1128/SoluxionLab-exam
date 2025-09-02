import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  todos: Todo[];
  refresh: () => void;
}

const TodoList = ({ todos, refresh }: Props) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} refresh={refresh} />
      ))}
    </>
  );
};

export default TodoList;
