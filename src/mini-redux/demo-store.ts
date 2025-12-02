/**
 * Demo Store - Ví dụ state management với counter và user
 * 
 * State structure:
 * {
 *   counter: number,
 *   user: { name: string, age: number }
 * }
 */

import { createStore, Action, Store } from './store';

// ==================== STATE TYPES ====================

export interface UserState {
  name: string;
  age: number;
}

export interface AppState {
  counter: number;
  user: UserState;
}

// ==================== ACTION TYPES ====================

export enum ActionType {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  RESET = 'RESET',
  SET_COUNTER = 'SET_COUNTER',
  UPDATE_USER_NAME = 'UPDATE_USER_NAME',
  UPDATE_USER_AGE = 'UPDATE_USER_AGE',
}

export interface IncrementAction extends Action<ActionType.INCREMENT> {}
export interface DecrementAction extends Action<ActionType.DECREMENT> {}
export interface ResetAction extends Action<ActionType.RESET> {}
export interface SetCounterAction extends Action<ActionType.SET_COUNTER> {
  payload: number;
}
export interface UpdateUserNameAction extends Action<ActionType.UPDATE_USER_NAME> {
  payload: string;
}
export interface UpdateUserAgeAction extends Action<ActionType.UPDATE_USER_AGE> {
  payload: number;
}

export type AppAction =
  | IncrementAction
  | DecrementAction
  | ResetAction
  | SetCounterAction
  | UpdateUserNameAction
  | UpdateUserAgeAction;

// ==================== REDUCER ====================

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case ActionType.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };

    case ActionType.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      };

    case ActionType.RESET:
      return {
        ...state,
        counter: 0,
      };

    case ActionType.SET_COUNTER:
      return {
        ...state,
        counter: action.payload,
      };

    case ActionType.UPDATE_USER_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      };

    case ActionType.UPDATE_USER_AGE:
      return {
        ...state,
        user: {
          ...state.user,
          age: action.payload,
        },
      };

    default:
      return state;
  }
}

// ==================== INITIAL STATE ====================

const initialState: AppState = {
  counter: 0,
  user: {
    name: 'John Doe',
    age: 25,
  },
};

// ==================== CREATE STORE ====================

export const demoStore: Store<AppState, AppAction> = createStore(
  appReducer,
  initialState
);

// ==================== SELECTORS ====================

/**
 * Selector để lấy chỉ counter
 * Component chỉ re-render khi counter thay đổi
 */
export const selectCounter = (state: AppState): number => state.counter;

/**
 * Selector để lấy chỉ user
 * Component chỉ re-render khi user thay đổi
 */
export const selectUser = (state: AppState): UserState => state.user;

/**
 * Selector để lấy chỉ user name
 * Component chỉ re-render khi user.name thay đổi
 */
export const selectUserName = (state: AppState): string => state.user.name;

/**
 * Selector kết hợp để lấy cả counter và user
 * Component sẽ re-render khi counter HOẶC user thay đổi
 */
export const selectCounterAndUser = (state: AppState): { counter: number; user: UserState } => ({
  counter: state.counter,
  user: state.user,
});

