import { faMinus, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
export default function TodoItem({
  todo,
  onChange,
  onDelete,
  isCompletedArr,
  cuttedArr,
  popup,
  setCopyDisabledValue,
  setPasteDisabledValue,
  setCutDisabledValue,
}) {
  const [tag, setTag] = useState(null);
  const [todoIcon, setTodoIcon] = useState(faPen);

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
        setTodoIcon(faCheck);
      }}
    />
  );

  const tagFunc = () => {
    if (!todo.onModified) {
      todo.onModified = true;
      setTodoIcon(faCheck);
      setTag(textInput);
    } else {
      if (!todo.text) {
        onDelete(todo);
      }
      setTodoIcon(faPen);
      popup("Saved!");
      todo.onModified = false;
      setTag(null);
    }
  };

  return (
    <div key={todo.id} className="todoListItem">
      <label className="listItemInner">
        <input
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
        <FontAwesomeIcon
          icon={todoIcon}
          className="listItemEditBtn"
          draggable="false"
          onClick={tagFunc}
        />
        <FontAwesomeIcon
          icon={faMinus}
          className="listItemBtnDel"
          draggable="false"
          onClick={() => {
            onDelete(todo);
          }}
        />
      </div>
    </div>
  );
}
