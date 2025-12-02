/**
 * Component B - Có button để thay đổi dữ liệu
 *
 * Component này:
 * - Dispatch actions để thay đổi state trong store
 * - KHÔNG subscribe vào store (không cần re-render khi state thay đổi)
 * - Chỉ dispatch actions, không đọc state
 */

import React, { Component } from "react";
import { ActionType, AppAction, demoStore } from "../mini-redux";

interface CounterControlsProps {
  // Không cần props
}

export class CounterControls extends Component<CounterControlsProps> {
  /**
   * Dispatch INCREMENT action
   */
  handleIncrement = (): void => {
    const action: AppAction = { type: ActionType.INCREMENT };
    demoStore.dispatch(action);
  };

  /**
   * Dispatch DECREMENT action
   */
  handleDecrement = (): void => {
    const action: AppAction = { type: ActionType.DECREMENT };
    demoStore.dispatch(action);
  };

  /**
   * Dispatch RESET action
   */
  handleReset = (): void => {
    const action: AppAction = { type: ActionType.RESET };
    demoStore.dispatch(action);
  };

  /**
   * Dispatch SET_COUNTER action với giá trị cụ thể
   */
  handleSetCounter = (value: number): void => {
    const action: AppAction = {
      type: ActionType.SET_COUNTER,
      payload: value,
    };
    demoStore.dispatch(action);
  };

  render() {
    return (
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">
            Counter Controls (Component B)
          </h2>

          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={this.handleIncrement}>+ Increment</button>

            <button onClick={this.handleDecrement}>- Decrement</button>

            <button onClick={this.handleReset}>Reset</button>

            <button onClick={() => this.handleSetCounter(10)}>Set to 10</button>

            <button onClick={() => this.handleSetCounter(100)}>
              Set to 100
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Component này dispatch actions → chỉ Component A re-render
          </p>
        </div>
      </div>
    );
  }
}

export default CounterControls;
