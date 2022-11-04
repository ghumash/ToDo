import { useState, useEffect } from "react";

export default function TodoItem({
  todo,
  onChange,
  onDelete,
  isCompletedArr,
  cuttedArr,
  setCopyDisabledValue,
  setPasteDisabledValue,
  setCutDisabledValue,
}) {
  const [tag, setTag] = useState(null);
  const [todoIcon, setTodoIcon] = useState("./img/edit.png");

  useEffect(() => {
    if (isCompletedArr.length !== 0) {
      setCopyDisabledValue(false);
      setCutDisabledValue(false);
    } else {
      if (cuttedArr.length !== 0) {
        setPasteDisabledValue(false);
      } else {
        setPasteDisabledValue(true);
      }
      setCutDisabledValue(true);
      setCopyDisabledValue(true);
    }
  }, [isCompletedArr]);

  const textSpan = <span className="listItemText">{todo.text}</span>;
  const textInput = (
    <input
      className="listItemText"
      value={todo.text}
      onChange={(e) => {
        onChange({
          ...todo,
          text: e.target.value,
        });
        setTodoIcon("./img/checkbox.png");
      }}
    />
  );

  const tagFunc = () => {
    if (!todo.onModified) {
      todo.onModified = true;
      setTodoIcon("./img/checkbox.png");
      setTag(textInput);
    } else {
      if (!todo.text) {
        onDelete(todo);
      }
      setTodoIcon("./img/edit.png");
      todo.onModified = false;
      setTag(null);
    }
  };

  return (
    <div key={todo.id} className="todoListItem">
      <label className="listItemInner">
        <input // checkbox
          className="itemCheckbox"
          type="checkbox"
          checked={todo.isCompleted}
          onChange={(e) => {
            onChange({
              ...todo,
              isCompleted: e.target.checked,
            });
          }}
        />
        {!tag ? textSpan : textInput}
      </label>

      <div className="listItemSecondInner">
        <img
          draggable="false"
          className="listItemEditBtn"
          src={todoIcon}
          alt="Edit"
          onClick={tagFunc}
        />
        <img
          draggable="false"
          className="listItemBtnDel"
          onClick={() => {
            onDelete(todo);
          }}
          src="./img/x.png"
          alt="Delete"
        ></img>
      </div>
    </div>
  );
}
