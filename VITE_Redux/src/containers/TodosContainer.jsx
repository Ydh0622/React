import { connect, useSelector } from "react-redux";
import { changeInput, insert, toggle, remove } from "../modules/todos";
import Todos from "../components/Todos";
import useActions from "../lib/useActions";
import React from "react";

//     {
//   input,
//   todos,
//   changeInput,
//   insert,
//   toggle,
//   remove,
// }

const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));

  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    []
  );

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

export default React.memo(TodosContainer);

// connect(
//   //비구조화 할당을 통해 todos를 분리하여
//   //state.todos.input 대신 todos.input을 사용
//   ({ todos }) => ({
//     input: todos.input,
//     todos: todos.todos,
//   }),
//   { changeInput, insert, toggle, remove }
// )(TodosContainer);
