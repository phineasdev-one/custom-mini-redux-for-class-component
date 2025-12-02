/**
 * Component C - Hiển thị User Info
 *
 * Component này:
 * - Subscribe vào store với selector cho user
 * - Chỉ re-render khi user object thay đổi
 * - Không re-render khi counter thay đổi
 */

import React, { Component } from "react";
import { AppState, demoStore, selectUser, UserState } from "../mini-redux";

interface UserDisplayProps {
  // Không cần props
}

interface UserDisplayState {
  user: UserState;
}

export class UserDisplay extends Component<UserDisplayProps, UserDisplayState> {
  private unsubscribe: (() => void) | null = null;

  constructor(props: UserDisplayProps) {
    super(props);

    // Khởi tạo state từ store
    this.state = {
      user: selectUser(demoStore.getState()),
    };
  }

  componentDidMount(): void {
    // Subscribe với selector cho user
    // Chỉ nhận thông báo khi user thay đổi
    this.unsubscribe = demoStore.subscribe(
      this.handleStoreChange,
      selectUser // Selector: chỉ lắng nghe user
    );
  }

  componentWillUnmount(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  handleStoreChange = (state: AppState): void => {
    const newUser = selectUser(state);

    // Shallow compare user object
    if (
      this.state.user.name !== newUser.name ||
      this.state.user.age !== newUser.age
    ) {
      this.setState({ user: newUser });
    }
  };

  render() {
    const { user } = this.state;

    return (
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">
            User Display (Component C)
          </h2>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Name:</span>{" "}
              <span className="text-primary">{user.name}</span>
            </div>
            <div>
              <span className="font-semibold">Age:</span>{" "}
              <span className="text-primary">{user.age}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Component này chỉ re-render khi user thay đổi (không re-render khi
            counter thay đổi)
          </p>
        </div>
      </div>
    );
  }
}

export default UserDisplay;
