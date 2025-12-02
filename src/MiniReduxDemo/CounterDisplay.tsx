/**
 * Component A - Hiển thị dữ liệu Counter
 *
 * Component này:
 * - Subscribe vào store để lắng nghe thay đổi counter
 * - Chỉ re-render khi counter thay đổi (nhờ selector)
 * - Lấy data trực tiếp từ store (không dùng local state)
 * - Tự động unsubscribe khi unmount
 */

import React, { Component } from "react";
import {
  demoStore,
  selectCounter,
  selectCounterAndUser,
  selectUser,
} from "../mini-redux";

interface CounterDisplayProps {
  // Không cần props vì lấy data từ store
}

export class CounterDisplay extends Component<CounterDisplayProps> {
  private unsubscribe: (() => void) | null = null;

  componentDidMount(): void {
    // Subscribe vào store với selector kết hợp
    // Nhận thông báo khi counter HOẶC user thay đổi
    this.unsubscribe = demoStore.subscribe(
      this.handleStoreChange,
      selectCounterAndUser // Selector kết hợp: lắng nghe cả counter và user
    );
  }

  componentWillUnmount(): void {
    // Quan trọng: phải unsubscribe để tránh memory leak
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  /**
   * Handler khi store state thay đổi
   * Chỉ được gọi khi counter HOẶC user thực sự thay đổi (nhờ selector kết hợp)
   * Dùng forceUpdate() để re-render mà không cần local state
   */
  handleStoreChange = (): void => {
    // Force update để trigger re-render
    // Selector kết hợp đảm bảo chỉ gọi khi counter hoặc user thay đổi
    this.forceUpdate();
  };

  render() {
    // Lấy data trực tiếp từ store
    const counter = selectCounter(demoStore.getState());
    const user = selectUser(demoStore.getState());

    return (
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">
            Counter Display (Component A) {user.name}
          </h2>
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-2">
              {counter}
            </div>
            <p className="text-sm text-gray-500">
              Component này re-render khi counter hoặc user thay đổi
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CounterDisplay;
