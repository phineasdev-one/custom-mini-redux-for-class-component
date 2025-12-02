/**
 * Component D - Controls để thay đổi User
 *
 * Component này dispatch actions để update user
 */

import React, { Component, ChangeEvent, FormEvent } from "react";
import { ActionType, AppAction, demoStore } from "../mini-redux";

interface UserControlsProps {
  // Không cần props
}

interface UserControlsState {
  nameInput: string;
  ageInput: string;
}

export class UserControls extends Component<
  UserControlsProps,
  UserControlsState
> {
  constructor(props: UserControlsProps) {
    super(props);

    // Lấy giá trị hiện tại từ store để pre-fill form
    const currentState = demoStore.getState();
    this.state = {
      nameInput: currentState.user.name,
      ageInput: String(currentState.user.age),
    };
  }

  handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ nameInput: e.target.value });
  };

  handleAgeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ ageInput: e.target.value });
  };

  handleUpdateName = (): void => {
    if (this.state.nameInput.trim()) {
      const action: AppAction = {
        type: ActionType.UPDATE_USER_NAME,
        payload: this.state.nameInput.trim(),
      };
      demoStore.dispatch(action);
    }
  };

  handleUpdateAge = (): void => {
    const age = parseInt(this.state.ageInput, 10);
    if (!isNaN(age) && age > 0) {
      const action: AppAction = {
        type: ActionType.UPDATE_USER_AGE,
        payload: age,
      };
      demoStore.dispatch(action);
    }
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.handleUpdateName();
    this.handleUpdateAge();
  };

  render() {
    const { nameInput, ageInput } = this.state;

    return (
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">
            User Controls (Component D)
          </h2>

          <form onSubmit={this.handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={this.handleNameChange}
                  placeholder="Enter name"
                  className="input input-bordered flex-1"
                />
                <button type="button" onClick={this.handleUpdateName}>
                  Update Name
                </button>
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={ageInput}
                  onChange={this.handleAgeChange}
                  placeholder="Enter age"
                  className="input input-bordered flex-1"
                  min="1"
                />
                <button type="button" onClick={this.handleUpdateAge}>
                  Update Age
                </button>
              </div>
            </div>

            <button type="submit" className="w-full">
              Update Both
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Component này dispatch actions → chỉ Component C re-render
          </p>
        </div>
      </div>
    );
  }
}

export default UserControls;
