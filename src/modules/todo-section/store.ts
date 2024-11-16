import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { TItem, TList } from "./types";

// store для списков
class TodolistsStore {
  // начальное состояние
  todolists: TList[] = [];

  constructor() {
    // делает класс отслеживаемым (this - контект текущего класса)
    makeAutoObservable(this);
  }

  // экшены для работы со СПИСКАМИ

  addTodolist = (listTitle: string, items?: TItem[]) => {
    // вариант с items для возможного расширения генерации списков
    const itemsValue = items ? items : []; // если items не переданы, то пустой массив

    const newList: TList = {
      id: uuidv4(),
      creationDate: new Date(),
      title: listTitle,
      items: itemsValue,
    };

    // в отличие от redux можно менять состояние напрямую
    this.todolists.push(newList);
  };

  deleteTodolist = (listId: string) => {
    this.todolists = this.todolists.filter((list) => list.id !== listId);
  };

  renameTodolist = (listId: string, newTitle: string) => {
    const list = this.todolists.find((list) => list.id === listId);
    if (list) {
      list.title = newTitle;
    }
  };

  clearTodolists = () => {
    this.todolists = [];
  };

  // экшены для работы со ЭЛЕМЕНТАМИ

  addTodo = (listId: string, todoTitle: string) => {
    const list = this.todolists.find((list) => list.id === listId);
    if (list) {
      const newTodo: TItem = {
        id: uuidv4(),
        title: todoTitle,
        isDone: false,
      };
      list.items.push(newTodo);
    }
  };

  deleteTodo = (listId: string, todoId: string) => {
    const list = this.todolists.find((list) => list.id === listId);
    if (list) {
      list.items = list.items.filter((item) => item.id !== todoId);
    }
  };

  toggleTodo = (listId: string, todoId: string) => {
    const list = this.todolists.find((list) => list.id === listId);
    if (list) {
      const todo = list.items.find((item) => item.id === todoId);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    }
  };

  clearTodos = (listId: string) => {
    const list = this.todolists.find((list) => list.id === listId);
    if (list) {
      list.items = [];
    }
  };
}

const store = new TodolistsStore();
export default store;
