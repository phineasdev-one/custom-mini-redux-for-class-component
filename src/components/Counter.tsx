import * as React from 'react';
import './Counter.css';

interface CounterState {
  count: number;
}

export class Counter extends React.Component<{}, CounterState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
  }

  decrement = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1
    }));
  }

  reset = () => {
    this.setState({
      count: 0
    });
  }

  render() {
    return (
      <div className="Counter">
        <h2>Counter Component</h2>
        <div className="Counter-display">
          <span className="Counter-value">{this.state.count}</span>
        </div>
        <div className="Counter-buttons">
          <button onClick={this.decrement}>-</button>
          <button onClick={this.reset}>Reset</button>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }
}

