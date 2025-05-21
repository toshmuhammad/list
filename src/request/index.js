const baseURL = import.meta.env.VITE_BASE_URL;

export async function getTodos(filter) {
  const query = {};
  const url = new URL(baseURL + "/todos");
  const queryList = Object.entries(filter);

  queryList.forEach(([key, value]) => {
    if (value !== "") {
      query[key] = value;
    }
  });

  if (Object.keys(query).length > 0) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const req = await fetch(url.href);

  if (req.ok) {
    const result = await req.json();
    if (Array.isArray(result.data)) {
      return result.data;
    } else {
      console.warn("getTodos: result.data array emas", result.data);
      return [];
    }
  } else {
    throw new Error("getTodos: Xatolik yuz berdi");
  }
}

export async function addTodo(todo) {
  const req = await fetch(baseURL + "/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (req.ok) {
    const result = await req.json();
    if (result.data) {
      return result.data;
    }
    return result;
  } else {
    throw new Error("addTodo: Xatolik yuz berdi");
  }
}

export async function deleteTodo(id) {
  const req = await fetch(baseURL + "/todos/" + id, {
    method: "DELETE",
  });

  if (req.status === 200 || req.status === 202 || req.status === 204) {
    return id;
  } else if (req.status === 404) {
    console.warn(`Todo id=${id} topilmadi`);
    return null;
  } else {
    throw new Error("deleteTodo: Xatolik yuz berdi");
  }
}