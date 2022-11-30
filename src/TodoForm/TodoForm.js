import "./TodoForm.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoForm({
  text,
  todos,
  onAdd,
  isCompletedArr,
  cuttedArr,
  copyDisabledValue,
  pasteDisabledValue,
  cutDisabledValue,
  setText,
  setPasteDisabledValue,
  setTodos,
  setCuttedArr,
  popup,
}) {
  const [placeholder, setPlaceholder] = useState("What needs to be done?");
  const [copiedArr, setCopiedArr] = useState([]);

  const onHeaderSubmit = (e) => {
    e.preventDefault();
    if (text) {
      onAdd(text);
      popup("Added!");
      setPlaceholder("What needs to be done?");
    } else {
      setPlaceholder("Give me a text!");
    }
    setText("");
  };

  const notCheckedTodos = () => {
    return todos.filter((todo) => !todo.isCompleted);
  };

  const onCopy = () => {
    popup("Copied!");
    setCopiedArr(isCompletedArr);
    setCuttedArr([]);
    setPasteDisabledValue(false);
  };

  const onPaste = () => {
    popup("Pasted!");
    if (cuttedArr.length !== 0) {
      const checkNulledCutTodos = cuttedArr.map((cuttedTodo) => {
        return {
          id: cuttedTodo.id,
          text: cuttedTodo.text,
          isCompleted: false,
          onModified: false,
        };
      });
      setCuttedArr([]);
      return setTodos([...checkNulledCutTodos, ...notCheckedTodos()]);
    } else {
      const readyTodos = copiedArr.map((checkedTodo) => {
        return {
          id: uuidv4(),
          text: checkedTodo.text,
          isCompleted: false,
          onModified: false,
        };
      });
      return setTodos([...todos, ...readyTodos]);
    }
  };

  const onCut = () => {
    popup("Cutted!");
    setPasteDisabledValue(false);
    setCuttedArr(isCompletedArr);
    return setTodos([...notCheckedTodos()]);
  };

  return (
    <form className="header" onSubmit={(e) => onHeaderSubmit(e)}>
      <div className="headerInner">
        <input
          className="headerInput"
          type="text"
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="secondHeaderInner">
        <div className="btnAddContainer">
          <button className="btn btnAdd">Add</button>
        </div>
        <div className="formBtnGroup">
          <button
            className="btn btnCopy"
            type="button"
            disabled={copyDisabledValue}
            onClick={onCopy}
          >
            Copy
          </button>
          <button
            className="btn btnPaste"
            type="button"
            disabled={pasteDisabledValue}
            onClick={onPaste}
          >
            Paste
          </button>
          <button
            className="btn btnCut"
            type="button"
            disabled={cutDisabledValue}
            onClick={onCut}
          >
            Cut
          </button>
        </div>
      </div>
    </form>
  );
}
