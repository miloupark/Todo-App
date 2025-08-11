/* eslint-disable react/prop-types */

import { useState } from "react";
import "./App.css";
import TodoHeader from "./components/TodoHeader";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
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

  return (
    <>
      <input
        placeholder="오늘의 할 일"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
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

    // 입력이 없거나, 기존 투두의 내용과 같으면 닫기
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

  return (
    <li>
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
