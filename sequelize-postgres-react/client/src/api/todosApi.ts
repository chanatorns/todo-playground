import axios from 'axios';

const baseUrl = process.env.REACT_APP_TODO_SERVICE_URL || 'http://localhost:8080'

export const ORDER_BY = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  RELEVANCE: 'relevance'
}

const todoList = async () => {
  return await axios.get(baseUrl + '/todos')
    .then(r => r.data);
}

const createTodo = async (title) => {
  return await axios.post(
    baseUrl + '/todos',
    {
      title
    })
    .then(r => r.data);
}

const patchTodo = async (id, status) => {
  return await axios.patch(
    baseUrl + '/todos/' + id,
    {
      status
    })
    .then(r => r.data);
}

const createSubtask = async (title, todo_id) => {
  return await axios.post(
    baseUrl + '/subtasks',
    {
      title,
      todo_id
    })
    .then(r => r.data);
}

const patchSubtask = async (id, status) => {
  return await axios.patch(
    baseUrl + '/subtasks/' + id,
    {
      status
    })
    .then(r => r.data);
}


const api = {
  todoList,
  createTodo,
  patchTodo,
  createSubtask,
  patchSubtask
};

export default api;

