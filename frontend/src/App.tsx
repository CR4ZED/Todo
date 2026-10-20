import { FormEvent, useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

type Todo = { _id: string; title: string; done: boolean };

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  async function load() {
    try {
      const res = await fetch(`${API}/todos`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message ?? res.statusText);
      setTodos(json.data);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function add(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error((await res.json()).error?.message ?? res.statusText);
      setTitle("");
      load();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function toggle(todo: Todo) {
    try {
      const res = await fetch(`${API}/todos/${todo._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !todo.done }),
      });
      if (!res.ok) throw new Error((await res.json()).error?.message ?? res.statusText);
      load();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function remove(id: string) {
    try {
      const res = await fetch(`${API}/todos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error?.message ?? res.statusText);
      load();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <main>
      <h1>Todo App</h1>
      <form onSubmit={add}>
        <input placeholder="What needs doing?" required value={title} onChange={(e) => setTitle(e.target.value)} />
        <button>Add</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul>
        {todos.map((t) => (
          <li key={t._id}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t)} />
            <span className={t.done ? "done" : ""}>{t.title}</span>
            <button onClick={() => remove(t._id)}>✕</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
