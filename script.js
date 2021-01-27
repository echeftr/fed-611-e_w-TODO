// Select the Elements
const addBtn = document.querySelector(".add-button");
const clearAllBtn = document.querySelector(".clearAll");
const dateElement = document.getElementById("date");
const trashBtn = document.querySelector(".trash-btn");
const todoList = document.querySelector(".todo-list");
let li = document.createElement("Li");
const input = document.querySelector(".input");
const clearList = () => (todoList.innerHTML = "");

//Event Listeners
addBtn.addEventListener("click", async () => {
  await postTodo({ description: input.value, done: false });
  addToDOM();
});

clearAllBtn.addEventListener("click", async () => {
  await deleteAllTodos();
  clearList();
});

// Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//Functions
const addToDOM = async () => {
  const todos = await getTodo();
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    const newTodo = document.createElement("li");
    newTodo.innerHTML = todo.description;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Buttons
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa fa-check icons" ></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Button Toggle
    completedButton.addEventListener("click", () => {
      newTodo.classList.toggle("linethrough");
    });

    //Trash button
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fa fa-trash icons" ></i>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);
    trashBtn.addEventListener("click", async () => {
      await trashTodo(todo._id);
      addToDOM();
    });
    //AppendChild to list
    todoList.appendChild(todoDiv);
    // Clear input.value
    input.value = "";
  });
};

addToDOM();
