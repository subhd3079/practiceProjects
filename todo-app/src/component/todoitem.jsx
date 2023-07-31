import React from "react";

function TodoItem({ id, title, status, statusUpdate, deleteItem }) {
  return (
    <div className="todo-item">
      <div>
        <span className="text">{title}</span>
      </div>
      <div>
        <button
          className="status"
          style={
            status ? { backgroundColor: "green" } : { backgroundColor: "red" }
          }
          onClick={() => statusUpdate(id)}
        >
          {status ? "Done" : "Not Done"}
        </button>
        <button className="delete" onClick={() => deleteItem(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export { TodoItem };
