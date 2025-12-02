import * as React from 'react';
import { Counter } from './components/Counter';
import { TodoList } from './components/TodoList';
import './App.css';
import { MiniReduxDemoPage } from './MiniReduxDemo';

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React 15 TypeScript App</h1>
          <p>Class Components với Node 8</p>
        </header>
        <main className="App-main">
          <Counter />
          <TodoList />
          <MiniReduxDemoPage />
        </main>
      </div>
    );
  }
}

