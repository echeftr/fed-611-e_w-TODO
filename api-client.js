const baseUrl = `https://jsonbox.io/box_30adfa2c19a269697420/`;

//GET Todos
const getTodo = async () => {
  const result = await fetch(baseUrl);
  const json = await result.json();
  return json;
};
getTodo();

//POST Todo
const postTodo = async (data) => {
  const result = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await result.json();
  console.log(json);
};

// DELETE Todo
const trashTodo = async (id) => {
  const deleteData = `${baseUrl}${id}`;
  const result = await fetch(deleteData, {
    method: "DELETE",
  });
  const json = await result.json();
  return json;
};

// DELETE All Todo
const deleteAllTodos = async () => {
  const result = await fetch(baseUrl);
  const json = await result.json();
  json.forEach((item) => trashTodo(item._id));
};
