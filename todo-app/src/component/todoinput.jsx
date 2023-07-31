import React from "react";

function TodoInput({ addItemFunction }) {
  const [text, setText] = React.useState("");

  const getInput = (event) => {
    setText(event.target.value);
  };

  const addItem = (event) => {
    event.preventDefault();
    text.length !== 0 && addItemFunction(text);
    setText("");
  };

  return (
    <form className="input-sec">
      <input
        type="text"
        value={text}
        placeholder="Add Task"
        onChange={getInput}
      />
      <input type="submit" value="ADD" onClick={addItem} />
    </form>
  );
}

export { TodoInput };
