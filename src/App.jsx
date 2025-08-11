/* eslint-disable react/prop-types */

import { useState } from "react";
import "./App.css";
import TodoHeader from "./components/TodoHeader";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "react todo", completed: false },
    { id: 1, content: "learning js", completed: false },
    { id: 2, content: "zzz..", completed: false },
  ]);

  return (
    <>
      <TodoHeader />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    const todotext = inputValue.trim(); // 공백 방지
    if (!todotext) {
      alert("할 일을 입력해주세요");
      return;
    }
    const newTodo = { id: Number(new Date()), content: inputValue, completed: false };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    setInputValue("");
  };

  return (
    <>
      <label className="a11y-hidden" htmlFor="todo-input">
        오늘의 할 일
      </label>
      <input
        id="todo-input"
        type="text"
        placeholder="오늘의 할 일"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={addTodo}>추가하기</button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const startEdit = () => {
    setIsEdit(true);
    setInputValue("");
  };

  const cancelEdit = () => {
    setIsEdit(false);
    setInputValue("");
  };

  const saveEdit = () => {
    const isInputEdit = inputValue.trim();

    // 입력이 없거나, 기존 내용과 같으면 닫기
    if (!isInputEdit || isInputEdit === todo.content) {
      setIsEdit(false);
      setInputValue("");
      return;
    }

    // 투두의 내용 변경 시 업데이트
    setTodoList((prev) => {
      return prev.map((el) => (el.id === todo.id ? { ...el, content: isInputEdit } : el));
    });

    cancelEdit();
  };

  const checkTodo = (checked) => {
    setTodoList((prev) => {
      return prev.map((el) => (el.id === todo.id ? { ...el, completed: checked } : el));
    });
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(event) => checkTodo(event.target.checked)}
      />

      {isEdit ? (
        <>
          <input
            placeholder={todo.content}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button onClick={saveEdit}>저장</button>
        </>
      ) : (
        <>
          {todo.content}
          <button onClick={startEdit}>수정</button>
        </>
      )}

      <button
        onClick={() => {
          setTodoList((prev) => {
            return prev.filter((el) => el.id !== todo.id);
          });
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default App;
