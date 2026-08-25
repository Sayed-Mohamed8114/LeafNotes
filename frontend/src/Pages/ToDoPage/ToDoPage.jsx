import Card from "@/Components/Common/ToDoCard";
import AddTodoForm from "@/Components/Forms/AddTodoForm";
import { deleteTodo, getUserTodos } from "@/Services/ToDos";
import { getMe } from "@/Services/User";
import { useEffect, useState } from "react";

export default function ToDoPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const getUser = async () => {
    try {
      const data = await getMe();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTodoAdded = (newtodo) => {
    setTodos((prevTodos) => [newtodo, ...prevTodos]);
    setIsOpen(false);
  };

  const handleDelete = async (todo_id) => {
    try {
      await deleteTodo(todo_id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todo_id));
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
        <div className="px-2 lg:w-[60%] w-[70%] rounded-md bg-white/10 backdrop-blur-lg h-[5vh] mt-2 items-center flex justify-between">
          <h2 className="text-center justify-center items-center text-teal-50 font-['Black_Ops_One'] text-sm lg:text-lg">
            Welcome back
            <span className="text-teal-100 text-sm lg:text-lg font-mono font-extrabold">
              {" " + Capitalize}
            </span>
          </h2>
          <h2 className="text-teal-200 lg:text[20px] text-sm items-center text-center flex justify-center lg:text-[20px] font-serif font-semibold">
            manage your day by divide it into small tasks
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md-grid-5 gap-5 items-center justify-center mt-10 w-full px-10 py-5">
          {todos.map((todo) => (
            <Card key={todo.id} todo={todo} onDelete={()=>handleDelete(todo.id)} />
          ))}
        </div>
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-8 bottom-8 z-40 *:
      px-5 py-3 rounded-xl bg-teal-600 text-white 
      font-bold shadow-lg cursor-pointer hover:bg-teal-800 transition-colors duration-700
      "
      >
        Add New Task
      </button>
      <div
        className={`
        fixed inset-0 z-40
        bg-black/50 backdrop-blur-sm
        transition-opacity duration-500
        ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
      >
        <div
          className={`
            fixed right-0 z-50 h-auto 
            flex-col justify-center top-20
             flex items-center w-120 rounded-2xl
            bg-teal-900/5
            shadow-2xl
            transform transition-transform duration-500 ease-in-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}
        >
          <AddTodoForm ontodoAdded={handleTodoAdded} />
          <button
            onClick={() => setIsOpen(false)}
            className=" absolute bottom-0
                text-white text-2xl hover:text-white w-full bg-red-500 p-2 rounded-md
                cursor-pointer
                "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
