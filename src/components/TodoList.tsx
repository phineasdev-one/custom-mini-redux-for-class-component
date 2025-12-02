import * as React from 'react';
import './TodoList.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListState {
  todos: Todo[];
  inputValue: string;
}

export class TodoList extends React.Component<{}, TodoListState> {
  private nextId: number = 1;

  constructor(props: {}) {
    super(props);
    this.state = {
      todos: [],
      inputValue: ''
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleAddTodo = () => {
    if (this.state.inputValue.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: this.nextId++,
      text: this.state.inputValue,
      completed: false
    };

    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
      inputValue: ''
    }));
  }

  handleToggleTodo = (id: number) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  }

  handleDeleteTodo = (id: number) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter(todo => todo.id !== id)
    }));
  }

  render() {
    return (
      <div className="TodoList">
        <h2>Todo List Component</h2>
        <div className="TodoList-input">
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.handleAddTodo();
              }
            }}
            placeholder="Thêm công việc mới..."
          />
          <button onClick={this.handleAddTodo}>Thêm</button>
        </div>
        <ul className="TodoList-list">
          {this.state.todos.length === 0 ? (
            <li className="TodoList-empty">Chưa có công việc nào</li>
          ) : (
            this.state.todos.map(todo => (
              <li key={todo.id} className={`TodoList-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => this.handleToggleTodo(todo.id)}
                />
                <span className="TodoList-text">{todo.text}</span>
                <button
                  className="TodoList-delete"
                  onClick={() => this.handleDeleteTodo(todo.id)}
                >
                  Xóa
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
}

