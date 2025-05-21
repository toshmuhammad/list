import { useDispatch, useSelector } from "react-redux";
import { setData } from "../lib/redux-toolkit/slices/todo-slice";
import { getTodos } from "../request";
import Loading from "./Loading";
import Todo from "./Todo";
import { useEffect, useState } from "react";

export default function Todos() {
  const { data, filter } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getTodos(filter)
      .then(
        (res) => {
          if (res && Array.isArray(res.data)) {
            dispatch(setData(res.data));
          } else if (Array.isArray(res)) {
            dispatch(setData(res));
          } else {
            setError("Ma'lumot noto'g'ri formatda kelmoqda");
          }
          console.log(res);
          
        },
        (err) => {
          setError(err.message || "Xatolik yuz berdi");
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, JSON.stringify(filter)]);

  if (loading) {
    return (
      <div className="container mx-auto px-5 flex justify-center py-10">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-5 flex justify-center py-10">
        <p className="text-red-500">Xato: {error}</p>
      </div>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="container mx-auto px-5 flex justify-center py-10">
        <p>Hech qanday ma'lumot topilmadi</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 container mx-auto px-5 pb-10 pt-[116px]">
      {data.map(({ completed, title, id, priority }) => (
        <Todo
          key={id}
          completed={completed}
          title={title}
          priority={priority}
          id={id}
        />
      ))}
    </div>
  );
}