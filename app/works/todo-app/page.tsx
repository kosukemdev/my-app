"use client";

import { useState } from "react";

export default function TodoAppPage() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    if (task.trim() !== "") {
      e.preventDefault();
      setTasks([...tasks, task.trim()]);
      setTask("");
    }
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index: number) => {
    const newTask = prompt("新しいタスクを入力してください", tasks[index]);
    if (newTask !== null && newTask.trim() !== "") {
      setTasks(tasks.map((t, i) => (i === index ? newTask.trim() : t)));
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-16">
      <h1>Todoアプリ</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="追加したいTodoを入力"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">追加</button>
      </form>

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            <input type="checkbox" />
            {t} <button onClick={() => removeTask(index)}>削除</button>
            <button onClick={() => editTask(index)}>編集</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
