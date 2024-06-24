import todoStore from '../store/todoStore';

describe('todoStore', () => {
  beforeEach(() => {
    todoStore.todos = [];
    todoStore.nextId = 1;
    // Имитация localStorage
    Object.defineProperty(window, 'localStorage', {
      value: (function () {
        let store: { [key: string]: string } = {};
        return {
          getItem(key: string) {
            return store[key] || null;
          },
          setItem(key: string, value: string) {
            store[key] = value;
          },
          clear() {
            store = {};
          },
          removeItem(key: string) {
            delete store[key];
          },
        };
      })(),
      writable: true,
    });
    window.localStorage.clear();
  });

  test('adds a new todo', () => {
    todoStore.addTodo('Test task');
    expect(todoStore.todos.length).toBe(1);
    expect(todoStore.todos[0].text).toBe('Test task');
  });

  test('toggles todo completion', () => {
    todoStore.addTodo('Test task');
    todoStore.toggleTodo(todoStore.todos[0].id);
    expect(todoStore.todos[0].completed).toBe(true);
    todoStore.toggleTodo(todoStore.todos[0].id);
    expect(todoStore.todos[0].completed).toBe(false);
  });

  test('deletes a todo', () => {
    todoStore.addTodo('Test task');
    const id = todoStore.todos[0].id;
    todoStore.deleteTodo(id);
    expect(todoStore.todos.length).toBe(0);
  });

  test('updates a todo', () => {
    todoStore.addTodo('Test task');
    const id = todoStore.todos[0].id;
    todoStore.updateTodo(id, 'Updated task');
    expect(todoStore.todos[0].text).toBe('Updated task');
  });

  test('loads todos from localStorage', () => {
    const todos = [{ id: 1, text: 'Test task', completed: false }];
    localStorage.setItem('todos', JSON.stringify(todos));
    todoStore.loadTodos();
    let storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    if (storedTodos === null) {
      storedTodos = [];
    }
    expect(todoStore.todos.length).toBe(1);
    expect(todoStore.todos[0].text).toBe('Test task');
  });

  test('saves todos to localStorage', () => {
    todoStore.addTodo('Test task');
    todoStore.saveTodos();
    const storedTodos =
 JSON.parse(localStorage.getItem('todos') || '[]');
    expect(storedTodos.length).toBe(1);
    expect(storedTodos[0].text).toBe('Test task');
  });
});
