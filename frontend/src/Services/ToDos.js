import api from "../API/axios";

export const getUserTodos = async () => {
  const response = await api.get("/todos/all");
  return response.data;
};

export const addNewTodo = async (todo_data) => {
  const response = await api.post("/todos", todo_data);
  return response.data;
};

export const findTodo = async (todo_id) => {
  const response = await api.get(`/todos/${todo_id}`);
  return response.data;
};

export const updateTodo = async (todo_id, todo_data) => {
  const response = await api.patch(`/todos/${todo_id}`, todo_data);
  return response.data;
};

export const deleteTodo = async (todo_id) => {
  const response = await api.delete(`/todos/${todo_id}`);
  return response.data; 
};
