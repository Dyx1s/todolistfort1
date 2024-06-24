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
    //Загрузим
    loadTodos = () => {
        const todos = localStorage.getItem('todos');
        const nextId = localStorage.getItem('nextId');
        if (todos) {
            this.todos = JSON.parse(todos);
        }

        if(nextId) {
            this.nextId = parseInt(nextId, 10);
        }
    };

    //Сохраним
    saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(this.todos));
        localStorage.setItem('nextId', String(this.nextId));
    };

    addTodo = (text: string) => {
        this.todos.push({ id: this.nextId++, text, completed: false });
        this.saveTodos();
    };

    updateTodo = (id: number, text: string) => {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
        todo.text = text;
        this.saveTodos();
        }
    };

    deleteTodo = (id: number) => {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
    };

    toggleTodo = (id: number) => {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }
}

const todoStore = new TodoStore();
export default todoStore;
export type { TodoStore, Todo };