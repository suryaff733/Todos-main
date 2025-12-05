import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface Todo {
  _id: string;
  title: string;
  details: string;
  completed: boolean;
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const navigate=useNavigate()
  const baseUrl=import.meta.env.BACKEND_URL || "http://localhost:3005/api/user";

  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setTodos(data);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${baseUrl}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, details }),
    });
    if (res.ok) {
      setTitle("");
      setDetails("");
      fetchTodos();
    }
  };

  const deleteTodo = async (id: string) => {
    await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleLogout= ()=>{
    localStorage.removeItem("token");
    navigate("/login")
  };

  useEffect(()=>{
    if(!token){
      navigate("/login")
    }else{
      fetchTodos();
    }

  },[])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Logout</button>
        
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          Your Todos
        </h2>
        <form onSubmit={addTodo} className="flex flex-col gap-3 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          <input
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Details"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
          >
            Add Todo
          </button>
        </form>
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <div>
                <h3 className="font-semibold">{todo.title}</h3>
                <p className="text-sm text-gray-600">{todo.details}</p>
              </div>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
