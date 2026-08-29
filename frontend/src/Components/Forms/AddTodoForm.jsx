import { addNewTodo, updateTodo } from "@/Services/ToDos";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function AddTodoForm({
  onTodoAdded,
  oneditingTodo,
  onTodoUpdate,
}) {
  const [todo_data, setTodoData] = useState({
    title: "",
    description: "",
    due_date: "",
  });
  const addTodo = async (e) => {
    e.preventDefault();
    try {
      if (oneditingTodo) {
        const updatedTodo = await updateTodo(oneditingTodo.id, todo_data);
        onTodoUpdate(updatedTodo);
      } else {
        const data = await addNewTodo(todo_data);
        setTodoData({
          title: "",
          description: "",
          due_date: "",
        });
        onTodoAdded(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (oneditingTodo) {
      setTodoData({
        title: oneditingTodo.title || "",
        description: oneditingTodo.description || "",
        due_date: oneditingTodo.due_date || "",
      });
    } else {
      setTodoData({
        title: "",
        description: "",
        due_date: "",
      });
    }
  }, [oneditingTodo]);

  return (
    <StyledWrapper className="h-[80%] mb-5 w-full p-0 m-0 bg-white/10 rounded-2xl backdrop-blur-2xl">
      <form
        className="form
      px-20 py-10 rounded-2xl h-full
      "
        onSubmit={addTodo}
      >
        <p className="font-['Black_Ops_One'] mb-10 text-teal-100 relative inline-block">
          {oneditingTodo ? "Edit Todo" : "Add Todo"}
          <span className="absolute left-1/2 bottom-px  h-1 w-full -translate-x-1/2 overflow-hidden">
            <span className="absolute left-1/2 h-full w-0 -translate-x-1/2 bg-green-50 animate-underline" />
          </span>
        </p>
        <div className="group">
          <input
            required
            className="main-input"
            type="text"
            value={todo_data.title}
            onChange={(e) =>
              setTodoData({
                ...todo_data,
                title: e.target.value,
              })
            }
          />
          <span className="highlight-span" />
          <label className="lebal-email">Title</label>
        </div>

        <div className="container-1">
          <div className="group">
            <input
              required
              className="main-input"
              type="text"
              value={todo_data.description}
              onChange={(e) =>
                setTodoData({
                  ...todo_data,
                  description: e.target.value,
                })
              }
            />
            <span className="highlight-span" />
            <label className="lebal-email">Description</label>
          </div>
        </div>

        <div className="container-1">
          <div className="group">
            <input
              required
              className="main-input text-teal-50 placeholder:text-white"
              type="date"
              value={todo_data.due_date}
              onChange={(e) =>
                setTodoData({
                  ...todo_data,
                  due_date: e.target.value,
                })
              }
            />
            <span className="highlight-span" />
          </div>
        </div>

        <button
          type="submit"
          className="bg-teal-500 backdrop-blur-lg  
        py-3 mt-8 w-full cursor-pointer rounded-lg 
        text-lg font-['Black_Ops_One'] hover:text-teal-900
         text-teal-50 transition duration-700
          hover:bg-white/90"
        >
          {oneditingTodo ? "Update" : "Submit"}
        </button>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .group {
    position: relative;
  }

  .form {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
  }

  .form p {
    padding-bottom: 20px;
    font-size: 40px;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .container-1 {
    padding-top: 30px;
  }

  .main-input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 185px;
    border: none;
    border-bottom: 1px solid #6c6c6c;
    background: transparent;
    color: #ffffff;
  }

  .main-input:focus {
    outline: none;
    border-bottom-color: #42ff1c;
  }

  .lebal-email {
    color: #999999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  .main-input:focus ~ .lebal-email,
  .main-input:valid ~ .lebal-email {
    top: -20px;
    font-size: 14px;
    color: #42ff1c;
  }

  .highlight-span {
    position: absolute;
    height: 60%;
    width: 0px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }

  .main-input:focus ~ .highlight-span {
    -webkit-animation: input-focus 0.3s ease;
    animation: input-focus 0.3s ease;
  }

  @keyframes input-focus {
    from {
      background: #42ff1c;
    }

    to {
      width: 185px;
    }
  }
`;
