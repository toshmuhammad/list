import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Todos from "./components/Todos";
import { getTodos } from "./request";
import { Toaster } from "sonner";

function reducerFunction(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "get":
      return { ...state, todos: payload, loading: false };
    case "loading":
      return { ...state, loading: !state.loading };
    case "error":
      return { ...state, error: payload };
    case "delete":
      return { ...state, todos: state.todos.filter((el) => el.id !== payload) };
    default:
      return state;
  }
}

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export default function App() {
  const [state, dispatch] = useReducer();
  useEffect(() => {
    dispatch({ type: "loading" });
    getTodos()
      .then((res) => {
        dispatch({ type: "get", payload: res });
      })
      .catch(({ message }) => {
        dispatch({ type: "error", payload: message });
      })
      .finally(() => { });
  }, [])
  return (
    <>
      <Header />
      <main>
        <Todos state={state} dispatch={dispatch} />
      </main>
      <Toaster position="top-right" />
    </>
  );
}