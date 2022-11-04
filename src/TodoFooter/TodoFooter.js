import "./TodoFooter.css";

export default function TodoFooter({
  todos,
  onClearCompleted,
  isCompletedArr,
  text,
  setText,
  onAdd,
  popup,
}) {
  const completedSize = todos.filter((todo) => todo.isCompleted).length;
  const filterIsEmpty = todos.filter((item) => item.text.includes(text));

  if (text && filterIsEmpty.length === 0) {
    return (
      <form
        onSubmit={(e) => {
          popup("Added!");
          e.preventDefault();
          onClearCompleted();
          onAdd(text);
          setText("");
        }}
        className="footer"
      >
        <span className="footerText">
          Todo not found! do you want to{" "}
          <button className="footerAddBtn">Add?</button>
        </span>
      </form>
    );
  } else {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isCompletedArr.length !== 0) {
            popup("Cleared!");
            onClearCompleted();
          }
        }}
        className="footer"
      >
        <span className="footerText">
          {completedSize}/{todos.length} Completed
        </span>
        <button className="btnClear">Clear Completed</button>
      </form>
    );
  }
}
