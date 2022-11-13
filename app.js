// const { request, response } = require("express");
const express = require("express");
const app = express();
const { todo } = require("./models");
const bodyparser = require("body-parser");
app.use(bodyparser.json());

app.get("/todos", (request, response) => {
  //response.send("hello world");
  console.log("Todo list");
});

app.post("/todos", async (request, response) => {
  //response.send("hello world");
  console.log("creating a todo,request.body");
  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      duedate: request.body.duedate,
      completed: false,
    });
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});
app.put("/todos/:id/markAscompleted", async (request, response) => {
  //response.send("hello world");
  console.log("We have updated a todo with id:", request.params.id);
  const todo = await Todo.finsBypk(request.params.id);

  try {
    const updatedtodo = await Todo.markAscompleted();
    return response.json(updatedtodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", (request, response) => {
  //response.send("hello world");
  console.log("delete a todo by id:", request.params.id);
});

module.exports=app;
