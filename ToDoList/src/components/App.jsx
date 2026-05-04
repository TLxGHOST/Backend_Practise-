import React from "react";
import { useState } from "react";
import Heading from "./Heading";

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  function trackText(e) {
    const value = e.target.value;
    setText(value);
  }
  function handleAdd() {
    if (!text.trim()) return;
    setItems((prev) => [text, ...prev]);
    setText("");
    // console.log(items);
  }
  return (
    <div className="container">
      <div className="heading">
        <Heading title="To-Do List" />
      </div>

      <div className="form">
        <input name="input" type="text" onChange={trackText} value={text} />
        <button type="submit" onClick={handleAdd}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((item, index) => (
            <li key={index}> {item} </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
