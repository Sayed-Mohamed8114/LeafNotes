import Card from "@/Components/Common/ToDoCard";
import AddTodoForm from "@/Components/Forms/AddTodoForm";
import { deleteTodo, getUserTodos, updateTodo } from "@/Services/ToDos";
import { getMe } from "@/Services/User";
import { useEffect, useState } from "react";

export default function ToDoPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  // Get current user
  const getUser = async () => {
    try {
      const data = await getMe();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Get all todos
  const getTodos = async () => {
    setLoading(true);

    try {
      const data = await getUserTodos();
      setTodos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Mark todo as done / undo
  const handleDoneTodo = async (todo_id, completed) => {
    try {
      const updatedTodo = await updateTodo(todo_id, {
        completed: !completed,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === todo_id ? updatedTodo : todo)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  // handle add new task
  const handleTodoAdded = (newTodo) => {
    setTodos((prevTodos) => [newTodo, ...prevTodos]);

    setIsOpen(false);
  };

  // handle delete task or todo
  const handleDelete = async (todo_id) => {
    try {
      await deleteTodo(todo_id);

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todo_id));
    } catch (error) {
      console.error(error);
    }
  };

  //handle edit todo
  const handleEdit = async (todo) => {
    setEditTodo(todo);
    setIsOpen(true);
  };

  //handel update todo
  const handleTodoUpdate = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      ),
    );

    setEditTodo(null);
    setIsOpen(false);
  };

  // Load data when page opens
  useEffect(() => {
    getTodos();
    getUser();
  }, []);

  // make the user first letter capital
  const Capitalize = user?.name
    ? user.name[0].toUpperCase() + user.name.slice(1)
    : "";

  return (
    <div className="bg-gray-900 w-full min-h-screen h-auto ">
      <div className="flex flex-col justify-center items-center">
        <div
          className="
            px-2
            lg:w-[60%] w-[90%] md:w-[70%]
            rounded-md
            bg-white/10
            backdrop-blur-lg
            h-[6vh]
            mt-2
            items-center
            flex
            justify-between
          "
        >
          <h2
            className="
              text-center
              text-teal-50
              font-['Black_Ops_One']
              text-sm
              lg:text-lg
            "
          >
            Welcome back
            <span
              className="
                text-teal-100
                text-sm
                lg:text-lg
                font-mono
                font-extrabold
              "
            >
              {" " + Capitalize}
            </span>
          </h2>
          <h2
            className="
              text-teal-200
              text-sm
              lg:text-[20px]
              items-center
              text-center
              flex
              justify-center
              font-serif
              font-semibold
            "
          >
            manage your day by divide it into small tasks
          </h2>
        </div>

        {loading ? (
          <p className="text-teal-100 mt-10">Loading todos...</p>
        ) : (
          <div
            className="
              grid 
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              xl:grid-cols-5
              md:grid-cols-2
              gap-10
              mt-10
              w-full
              px-30 md:px-20 lg:px-10 sm:px-10
              md:py-5

            "
          >
            {todos.map((todo) => (
              <Card
                key={todo.id}
                todo={todo}
                onEdit={() => handleEdit(todo)}
                onDone={() => handleDoneTodo(todo.id, todo.completed)}
                onDelete={() => handleDelete(todo.id)}
              />
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed
          right-8
          bottom-8
          z-40
          px-5
          py-3
          rounded-xl
          bg-teal-600
          text-white
          font-bold
          shadow-lg
          cursor-pointer
          hover:bg-teal-800
          transition-colors
        animate-bounce
        hover:shadow-gray-600 duration-1000
        "
      >
        Add New Task
      </button>

      <div
        onClick={() => setIsOpen(false)}
        className={`
          fixed
          inset-0
          z-40
          bg-black/50
          backdrop-blur-sm
          transition-opacity
          duration-500

          ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      />

      <div
        className={`
          fixed
          right-0
          top-20
          z-50
          h-auto
          w-120
          max-w-[90%]
          rounded-l-2xl
          bg-gray-900
          shadow-2xl
          p-5

          transform
          transition-transform
          duration-500
          ease-in-out

          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="
            absolute
            right-4
            top-5
            text-gray-400
            text-4xl mr-5
            hover:text-white
            cursor-pointer z-10 
          "
        >
          ×
        </button>

        {/* Form */}
        <AddTodoForm
          onTodoAdded={handleTodoAdded}
          oneditingTodo={editTodo}
          onTodoUpdate={handleTodoUpdate}
        />

        {/* Cancel button */}
        <button
          onClick={() => setIsOpen(false)}
          className="
            w-full
            mt-4
            text-white
            bg-red-500
            hover:bg-red-700
            p-2
            rounded-md
            cursor-pointer
            transition-colors
            duration-300
          "
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
