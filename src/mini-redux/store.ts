/**
 * Mini Redux Store - Tự chế cho React 15 + SharePoint On-Premise
 *
 * Đặc điểm:
 * - Không dùng Hook, Context API, hoặc thư viện ngoài
 * - Dùng EventEmitter pattern (pub-sub) để notify subscribers
 * - Có shallow compare để optimize re-render
 * - Type-safe với TypeScript (không dùng any)
 */

// ==================== TYPES ====================

/**
 * Action interface - mọi action phải có type
 */
export interface Action<T = string> {
  type: T;
  payload?: unknown;
}

/**
 * Reducer function type
 */
export type Reducer<S, A extends Action> = (state: S, action: A) => S;

/**
 * Listener function type - được gọi khi state thay đổi
 */
export type Listener<S> = (state: S) => void;

/**
 * Selector function - để component chỉ subscribe phần state cần thiết
 */
export type Selector<S, R> = (state: S) => R;

/**
 * Subscription object - lưu thông tin listener và selector
 */
interface Subscription<S> {
  id: string;
  listener: Listener<S>;
  selector?: Selector<S, any>;
  previousValue?: any;
}

// ==================== STORE CLASS ====================

/**
 * Mini Redux Store
 *
 * Cách hoạt động:
 * 1. Store lưu state hiện tại và danh sách subscribers
 * 2. Khi dispatch action → reducer tạo state mới
 * 3. So sánh state cũ và mới (shallow compare)
 * 4. Nếu có thay đổi → notify tất cả subscribers
 * 5. Mỗi subscriber có thể có selector để chỉ nhận thông báo khi phần state liên quan thay đổi
 */
export class Store<S, A extends Action> {
  private state: S;
  private reducer: Reducer<S, A>;
  private subscriptions: Map<string, Subscription<S>>;
  private subscriptionIdCounter: number;

  constructor(reducer: Reducer<S, A>, initialState: S) {
    this.state = initialState;
    this.reducer = reducer;
    this.subscriptions = new Map();
    this.subscriptionIdCounter = 0;
  }

  /**
   * Lấy state hiện tại
   */
  getState(): S {
    return this.state;
  }

  /**
   * Dispatch action để thay đổi state
   *
   * Flow:
   * 1. Gọi reducer với state hiện tại và action
   * 2. So sánh state mới với state cũ (shallow compare)
   * 3. Nếu có thay đổi → cập nhật state và notify subscribers
   */
  dispatch(action: A): void {
    const previousState = this.state;
    const newState = this.reducer(previousState, action);

    // Shallow compare để kiểm tra state có thay đổi không
    if (this.hasStateChanged(previousState, newState)) {
      this.state = newState;
      this.notifySubscribers(previousState, newState);
    }
  }

  /**
   * Subscribe để lắng nghe thay đổi state
   *
   * @param listener - Function được gọi khi state thay đổi
   * @param selector - Optional: Chỉ notify khi phần state này thay đổi
   * @returns Unsubscribe function
   */
  subscribe<R>(listener: Listener<S>, selector?: Selector<S, R>): () => void {
    const id = `sub_${++this.subscriptionIdCounter}`;

    // Lưu previous value nếu có selector để so sánh
    const previousValue = selector ? selector(this.state) : undefined;

    const subscription: Subscription<S> = {
      id,
      listener,
      selector,
      previousValue,
    };

    this.subscriptions.set(id, subscription);

    // Trả về unsubscribe function
    return () => {
      this.subscriptions.delete(id);
    };
  }

  /**
   * Notify tất cả subscribers khi state thay đổi
   *
   * Logic:
   * - Nếu subscriber có selector → chỉ notify khi giá trị selector thay đổi
   * - Nếu không có selector → notify mọi lúc state thay đổi
   */
  private notifySubscribers(_: S, newState: S): void {
    this.subscriptions.forEach((subscription) => {
      if (subscription.selector) {
        // Có selector → chỉ notify khi phần state này thay đổi
        const previousValue = subscription.previousValue;
        const currentValue = subscription.selector(newState);

        if (this.hasValueChanged(previousValue, currentValue)) {
          subscription.previousValue = currentValue;
          subscription.listener(newState);
        }
      } else {
        // Không có selector → notify mọi lúc
        subscription.listener(newState);
      }
    });
  }

  /**
   * Shallow compare state objects
   * So sánh từng key ở level 1 (không deep)
   */
  private hasStateChanged(prev: S, next: S): boolean {
    if (prev === next) {
      return false;
    }

    // Nếu là primitive → so sánh trực tiếp
    if (typeof prev !== "object" || prev === null) {
      return prev !== next;
    }

    // Nếu là object → shallow compare
    const prevKeys = Object.keys(prev as Record<string, unknown>);
    const nextKeys = Object.keys(next as Record<string, unknown>);

    if (prevKeys.length !== nextKeys.length) {
      return true;
    }

    for (const key of prevKeys) {
      const prevValue = (prev as Record<string, unknown>)[key];
      const nextValue = (next as Record<string, unknown>)[key];

      if (prevValue !== nextValue) {
        return true;
      }
    }

    return false;
  }

  /**
   * So sánh giá trị (dùng cho selector values)
   */
  private hasValueChanged(prev: unknown, next: unknown): boolean {
    if (prev === next) {
      return false;
    }

    // Nếu là primitive
    if (typeof prev !== "object" || prev === null) {
      return prev !== next;
    }

    // Nếu là object → shallow compare
    if (typeof next !== "object" || next === null) {
      return true;
    }

    const prevKeys = Object.keys(prev as Record<string, unknown>);
    const nextKeys = Object.keys(next as Record<string, unknown>);

    if (prevKeys.length !== nextKeys.length) {
      return true;
    }

    for (const key of prevKeys) {
      const prevVal = (prev as Record<string, unknown>)[key];
      const nextVal = (next as Record<string, unknown>)[key];

      if (prevVal !== nextVal) {
        return true;
      }
    }

    return false;
  }
}

/**
 * Factory function để tạo store (giống Redux createStore)
 */
export function createStore<S, A extends Action>(
  reducer: Reducer<S, A>,
  initialState: S
): Store<S, A> {
  return new Store(reducer, initialState);
}
