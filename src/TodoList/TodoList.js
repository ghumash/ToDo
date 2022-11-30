import TodoItem from "./TodoItem";
import "./TodoList.css";
import { useEffect } from "react";

export default function TodoList({
  todos,
  onChange,
  onDelete,
  text,
  isCompletedArr,
  cuttedArr,
  setTodos,
  setCopyDisabledValue,
  setPasteDisabledValue,
  setCutDisabledValue,
  popup,
  Reorder,
  AnimatePresence,
}) {
  useEffect(() => {
    if (todos.length === 0) {
      setCopyDisabledValue(true);
      setPasteDisabledValue(true);
      setCutDisabledValue(true);
    }
  }, [todos]);

  const variants = {
    initial: {
      opacity: "0",
      height: "0",
      fontSize: "0",
    },
    animate: {
      opacity: "1",
      height: "auto",
    },
    exit: {
      opacity: "0",
      height: "0",
    },
  };

  return (
    <Reorder.Group as="div" values={todos} onReorder={setTodos}>
      <div className="TodoList">
        {todos
          .filter((item) => {
            if (item.text.includes(text)) {
              return item;
            }
          })
          .map((todo) => {
            return (
              <Reorder.Item
                key={todo.id}
                value={todo}
                whileDrag={{
                  scale: 1.1,
                  boxShadow:
                    "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                }}
                {...variants}
              >
                <AnimatePresence>
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onChange={onChange}
                    onDelete={onDelete}
                    popup={popup}
                    isCompletedArr={isCompletedArr}
                    cuttedArr={cuttedArr}
                    setCopyDisabledValue={setCopyDisabledValue}
                    setPasteDisabledValue={setPasteDisabledValue}
                    setCutDisabledValue={setCutDisabledValue}
                  />
                </AnimatePresence>
              </Reorder.Item>
            );
          })}
      </div>
    </Reorder.Group>
  );
}
