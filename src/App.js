import "./App.css";
import TodoFooter from "./TodoFooter/TodoFooter";
import TodoForm from "./TodoForm/TodoForm";
import TodoList from "./TodoList/TodoList";

import swal from "sweetalert";
import { Reorder, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

export default function App() {
  const defaultData = [
    {
      id: uuidv4(),
      text: "Let's go!",
      isCompleted: false,
      onModified: false,
    },
  ];
  const localData = JSON.parse(localStorage.getItem("todos"));
  const [todos, setTodos] = useState(localData || defaultData);
  const [text, setText] = useState("");
  const [copyDisabledValue, setCopyDisabledValue] = useState(true);
  const [pasteDisabledValue, setPasteDisabledValue] = useState(true);
  const [cutDisabledValue, setCutDisabledValue] = useState(true);
  const [cuttedArr, setCuttedArr] = useState([]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  let isCompletedArr = todos.filter((todo) => todo.isCompleted);

  const popup = (text) => {
    swal({
      title: text,
      text: false,
      icon: false,
      button: false,
    });
    setTimeout(() => {
      swal.close();
    }, 600);
  };

  const onAdd = (text) => {
    return setTodos([
      ...todos,
      {
        id: uuidv4(),
        text: text,
        isCompleted: false,
        onModified: false,
      },
    ]);
  };

  const onDelete = (todo) => {
    setTodos(todos.filter((t) => t.id !== todo.id));
    popup("Deleted!");
  };

  const onChange = (newTodo) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === newTodo.id) {
          return newTodo;
        }
        return todo;
      })
    );
  };

  const onClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted));
  };

  return (
    <div className="App">
      <TodoForm
        todos={todos}
        text={text}
        isCompletedArr={isCompletedArr}
        cuttedArr={cuttedArr}
        copyDisabledValue={copyDisabledValue}
        cutDisabledValue={cutDisabledValue}
        pasteDisabledValue={pasteDisabledValue}
        popup={popup}
        onAdd={onAdd}
        setTodos={setTodos}
        setCuttedArr={setCuttedArr}
        setPasteDisabledValue={setPasteDisabledValue}
        setCutDisabledValue={setCutDisabledValue}
        setText={setText}
      />
      <TodoList
        text={text}
        todos={todos}
        isCompletedArr={isCompletedArr}
        cuttedArr={cuttedArr}
        setTodos={setTodos}
        setCutDisabledValue={setCutDisabledValue}
        setCopyDisabledValue={setCopyDisabledValue}
        setPasteDisabledValue={setPasteDisabledValue}
        onDelete={onDelete}
        onChange={onChange}
        popup={popup}
        Reorder={Reorder}
        AnimatePresence={AnimatePresence}
      />
      <TodoFooter
        text={text}
        todos={todos}
        isCompletedArr={isCompletedArr}
        popup={popup}
        onClearCompleted={onClearCompleted}
        setText={setText}
        onAdd={onAdd}
      />
    </div>
  );
}
