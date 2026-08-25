const Card = ({ todo, onDelete, onEdit, onDone }) => {
  return (
    <div
      className="relative flex justify-center items-center h-100 w-60 border-4 border-black rounded-2xl bg-teal-50"
      style={{
        boxShadow: "2px 2px 1px 4px rgb(200, 210, 210)",
      }}
    >
      <div className="w-[99%] h-[95%] mt-4 rounded-xl p-2 text-teal-950 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl  text-teal-700 text-center font-['Black_Ops_One'] font-bold wrap-break-word">
            {todo.title}
          </h2>

          <p className="mt-3 text-sm text-gray-500 text-center line-clamp-6">
            {todo.description}
          </p>
        </div>

        <div className="text-sm flex flex-col items-center justify-between p-1 text-center ">
          <div className="flex items-center justify-between w-full mb-3">
            <p>Due: {new Date(todo.due_date).toLocaleDateString()}</p>

            <p
              className={
                todo.completed
                  ? "text-green-500 font-extrabold "
                  : "text-yellow-600 font-extrabold "
              }
            >
              {todo.completed ? "Completed" : "Pending"}
            </p>
          </div>
          <div className="flex items-center justify-between w-full mt-1 gap-1">
            <button
              onClick={onEdit}
              className="py-2 px-3 bg-teal-500  rounded-md font-extrabold text-md
             hover:bg-yellow-700 text-white cursor-pointer 
             transition-colors duration-700 "
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="py-2 px-3 bg-red-700 rounded-md font-extrabold text-md
             hover:bg-red-900 text-white cursor-pointer 
             transition-colors duration-700"
            >
              Delete
            </button>
            <button
              onClick={onDone}
              className={`py-2 px-3 rounded-md font-extrabold text-md text-white transition-colors duration-700
    ${
      todo.completed
        ? "bg-gray-800 cursor-pointer"
        : "bg-green-700 hover:bg-green-900 cursor-pointer"
    }`}
            >
              {todo.completed ? "Undo" : "Done"}
            </button>
          </div>
        </div>
      </div>

      {/* Camera */}
      <span className="absolute top-0 border-4 border-black bg-black w-20 h-2 rounded-br-xl rounded-bl-xl" />

      {/* Side buttons */}
      <span className="absolute -right-2 top-14 border-4 border-black h-7 rounded-md" />

      <span className="absolute -right-2 bottom-36 border-4 border-black h-10 rounded-md" />
    </div>
  );
};

export default Card;
