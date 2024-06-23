import { makeAutoObservable } from 'mobx';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

class TodoStore {
    todos: Todo[] = [];
    nextId: number = 1;

    constructor() {
        makeAutoObservable(this);
        this.loadTodos();
    }

    loadTodos = () => {
        const todos = localStorage.getItem('todos');
        if (todos) {
            this.todos = JSON.parse(todos);
        }
    };

    addTodo = (text: string) => {
        this.todos.push({ id: this.nextId++, text, completed: false });
        this.loadTodos();
    };

    updateTodo = (id: number, text: string) => {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
        todo.text = text;
        }
    };

    deleteTodo = (id: number) => {
        this.todos = this.todos.filter(todo => todo.id !== id);
    };

    toggleTodo = (id: number) => {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    };
}

const todoStore = new TodoStore();
export default todoStore;
export type { TodoStore, Todo };