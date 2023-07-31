import React from "react";
import { TodoInput } from "./todoinput";
import { TodoItem } from "./todoitem";

function Todo() {
  const [todo, setTodo] = React.useState([]);

  const addTodoItem = (text) => {
    const newItem = {
      id: Math.random(),
      title: text,
      status: false,
    };

    setTodo([...todo, newItem]);
  };

  const statusUpdateFunction = (id) => {
    const x = todo.map((ele) =>
      id === ele.id ? { ...ele, status: !ele.status } : ele
    );

    setTodo(x);
  };

  const deleteItemFunction = (id) => {
    const x = todo.filter((ele) => id !== ele.id && ele);

    setTodo(x);
  };
  return (
    <div>
      <TodoInput addItemFunction={addTodoItem}></TodoInput>
      {todo.map((ele) => (
        <TodoItem
          key={ele.id}
          id={ele.id}
          title={ele.title}
          status={ele.status}
          statusUpdate={statusUpdateFunction}
          deleteItem={deleteItemFunction}
        ></TodoItem>
      ))}
    </div>
  );
}

export { Todo };
