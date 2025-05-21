import { createContext, useReducer } from "react";

export const GlobalContext = createContext();

function reducerFunction(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "get":
      return { ...state, todos: payload, loading: false };
    case "loading":
      return { ...state, loading: !state.loading };
    case "add":
      return { ...state, todos: [payload, ...state.todos] };
    case "error":
      return { ...state, error: payload };
    case "delete":
      return { ...state, todos: state.todos.filter((el) => el.id !== payload) };
    case "filter":
      return { ...state, filter: payload };
    default:
      return state;
  }
}

const initialState = {
  todos: [],
  loading: false,
  error: null,
  filter: "",
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}