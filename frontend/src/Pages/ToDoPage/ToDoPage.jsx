import Card from "@/Components/Common/ToDoCard";
import AddTodoForm from "@/Components/Forms/AddTodoForm";
import { getUserTodos } from "@/Services/ToDos";
import { getMe } from "@/Services/User";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ToDoPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const data = await getMe();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };
  const getTodos = async () => {
    setLoading(true);

    try {
      const data = await getUserTodos();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTodos();
    getUser();
    console.log(user);
  }, []);
  const Capitalize = user?.name
    ? user.name[0].toUpperCase() + user.name.slice(1)
    : "";
  return (
    <div className="bg-gray-900 w-full min-h-screen h-auto">
      <div className="flex flex-col justify-center items-center">
        <div className="px-2 w-[60%] rounded-md bg-white/10 backdrop-blur-lg h-[5vh] mt-2 items-center flex justify-between">
          <h2 className="text-center justify-center items-center text-teal-50 font-['Black_Ops_One'] text-lg">
            Welcome back
            <span className="text-teal-100 text-lg font-mono font-extrabold">
              {" " + Capitalize}
            </span>
          </h2>
          <h2 className="text-teal-200 text-[20px] font-serif font-semibold">
            manage your day by divide it into small tasks
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-8 items-center justify-center mt-10 w-full px-10 py-5">
          {todos.map((todo) => (
            <Card key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
}
