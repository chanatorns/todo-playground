import { makeAutoObservable } from "mobx";
import todosApi from "../api/todosApi";
import { booleanToStatus, statusToBoolean } from "../utils/todo";
var JSONAPISerializer = require("json-api-serializer");
var Serializer = new JSONAPISerializer();
Serializer.register("subtasks", {
  blacklist: ["updatedAt", "TodoId"]
});
Serializer.register('todos', {
  topLevelMeta: function(data) {
    return { total: data.length };
  },
  relationships: {
    subtasks: {
      type: "subtasks"
    }
  }
});

Serializer.register('todo');

class DataStore {
  todoList = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = v => this.loading = v;

  setTodoList = (v) => {
    this.todoList = v;
  }

  fetchTodos = async () => {
    this.setLoading(true)
    const result = await todosApi.todoList()
      .catch(() => null);

    await Serializer.deserializeAsync('todos', result)
      .then((result) => {
        this.setTodoList(result || []);
      });

    this.setLoading(false)
  }

  createTodo = async (title) => {
    this.setLoading(true)

    await todosApi.createTodo(title)
      .catch(() => null);

    await this.fetchTodos();

    this.setLoading(false)
  }

  changeTodoStatus = async (id, newStatus) => {
    this.setLoading(true)

    for (let i=0; i < this.todoList.length ; i = i+1) {
      if (this.todoList[i].id === id) {
        this.todoList[i].status = newStatus;
      }
    }

    if (statusToBoolean(newStatus) === true) {
      await this.changeChildSubtaskStatus(id, booleanToStatus(true))
    }

    await todosApi.patchTodo(id, newStatus)
      .catch(() => null);

    await this.fetchTodos();

    this.setLoading(false)
  }
  
  createSubtask = async (title, todo_id) => {
    this.setLoading(true)

    await todosApi.createSubtask(title, todo_id)
      .catch(() => null);

    await this.fetchTodos();

    this.setLoading(false)
  }

  changeSubtaskStatus = async (id, newStatus, todo_id?) => {
    this.setLoading(true)

    for (let i=0; i < this.todoList.length ; i = i+1) {
      if (this.todoList[i].subtasks.id === id) {
        this.todoList[i].status = newStatus;
        break;
      }
    }

    if (statusToBoolean(newStatus) === false) {
      await this.changeTodoStatus(todo_id, booleanToStatus(false))
    }

    await todosApi.patchSubtask(id, newStatus)
      .catch(() => null);

    await this.fetchTodos();

    this.setLoading(false)
  }

  changeChildSubtaskStatus = async (todo_id, newStatus) => {
    const subtaskIds = this.todoList
      .find(todo => todo.id === todo_id)
      .subtasks
      .map(subtask => {
        if (!statusToBoolean(subtask.status)) {
          subtask.status = newStatus;
          return subtask.id
        }
        return null;
      });

    const changeSubtaskReq = subtaskIds.map(id => {
      if (id) {
        return this.changeSubtaskStatus(id, newStatus)
      }
      return Promise.resolve();
    })

    await Promise.all(changeSubtaskReq);
  }
}

let dataStore: DataStore = null;
if (!dataStore) {
  dataStore = new DataStore();
}

export default dataStore;