/**
 * Demo Page - Tổng hợp tất cả components
 *
 * Mục đích: Demo mini Redux tự chế với React Class Components
 *
 * Cách hoạt động:
 * 1. Component B (CounterControls) dispatch actions → chỉ Component A (CounterDisplay) re-render
 * 2. Component D (UserControls) dispatch actions → chỉ Component C (UserDisplay) re-render
 * 3. Mỗi component chỉ subscribe phần state cần thiết (nhờ selector)
 * 4. Shallow compare đảm bảo chỉ re-render khi state thực sự thay đổi
 */

import React, { Component } from "react";
import CounterDisplay from "./CounterDisplay";
import CounterControls from "./CounterControls";
import UserDisplay from "./UserDisplay";
import UserControls from "./UserControls";

interface MiniReduxDemoPageProps {
  // Không cần props
}

export class MiniReduxDemoPage extends Component<MiniReduxDemoPageProps> {
  render() {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Mini Redux Demo</h1>
          <p className="text-lg text-gray-600 mb-2">
            State Manager tự chế cho React 15 + SharePoint On-Premise
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 text-left max-w-3xl mx-auto">
            <h3 className="font-semibold mb-2">✨ Tính năng:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>✅ Class Component (không dùng Hook)</li>
              <li>✅ EventEmitter pattern (pub-sub)</li>
              <li>✅ Shallow compare để optimize re-render</li>
              <li>
                ✅ Selector để component chỉ subscribe phần state cần thiết
              </li>
              <li>✅ Type-safe với TypeScript (không dùng any)</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Counter Section */}
          <div className="space-y-4">
            <CounterDisplay />
            <CounterControls />
          </div>

          {/* User Section */}
          <div className="space-y-4">
            <UserDisplay />
            <UserControls />
          </div>
        </div>

        {/* Explanation Section */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            📚 Giải thích cách hoạt động:
          </h2>

          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">
                1. Mini Redux Store hoạt động như thế nào?
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  Store lưu state hiện tại và danh sách subscribers (listeners)
                </li>
                <li>
                  Khi{" "}
                  <code className="bg-gray-200 px-1 rounded">
                    dispatch(action)
                  </code>{" "}
                  → reducer tạo state mới
                </li>
                <li>So sánh state cũ và mới bằng shallow compare</li>
                <li>Nếu có thay đổi → notify tất cả subscribers</li>
                <li>
                  Mỗi subscriber có thể có selector để chỉ nhận thông báo khi
                  phần state liên quan thay đổi
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                2. Component đăng ký lắng nghe state như thế nào?
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  Trong{" "}
                  <code className="bg-gray-200 px-1 rounded">
                    componentDidMount()
                  </code>
                  , gọi{" "}
                  <code className="bg-gray-200 px-1 rounded">
                    store.subscribe(listener, selector)
                  </code>
                </li>
                <li>
                  Selector là function nhận state và trả về phần state cần lắng
                  nghe
                </li>
                <li>
                  Store sẽ so sánh giá trị selector trước và sau mỗi dispatch
                </li>
                <li>Chỉ gọi listener nếu giá trị selector thay đổi</li>
                <li>
                  Quan trọng: phải{" "}
                  <code className="bg-gray-200 px-1 rounded">unsubscribe</code>{" "}
                  trong{" "}
                  <code className="bg-gray-200 px-1 rounded">
                    componentWillUnmount()
                  </code>{" "}
                  để tránh memory leak
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                3. Logic nhận biết state thay đổi:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Shallow Compare:</strong> So sánh từng key ở level 1
                  của object (không deep)
                </li>
                <li>
                  <strong>Selector-based:</strong> Nếu component có selector,
                  chỉ so sánh giá trị selector
                </li>
                <li>
                  <strong>Primitive Compare:</strong> Với primitive values
                  (number, string, boolean), so sánh trực tiếp bằng{" "}
                  <code className="bg-gray-200 px-1 rounded">===</code>
                </li>
                <li>
                  Kết quả: Component chỉ re-render khi phần state nó dùng thực
                  sự thay đổi
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                4. Lưu ý performance trong React 15:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  Luôn dùng selector để giới hạn phần state component subscribe
                </li>
                <li>
                  Shallow compare nhanh hơn deep compare, phù hợp với React 15
                </li>
                <li>
                  Nhớ unsubscribe để tránh memory leak và re-render không cần
                  thiết
                </li>
                <li>Tránh subscribe toàn bộ state nếu chỉ cần một phần nhỏ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MiniReduxDemoPage;
