const express = require("express");
const Todo = require("../models/todo");

const todoRouter = express.Router();

//GET todo with particular id
todoRouter.get("/:id", (req, res) => {
  let id = req.params.id;
  console.log(`GET ${id}`);

  //search database for the object with the provided id
  Todo.findById(id, (error, result) => {
    //if error => object not found
    if (error) {
      return res.status(404).json({ error: "Object not found" });
    }
    //return the found object
    res.json(result);
  });
});

//POST new todo
todoRouter.post("/", (req, res) => {
  //create a new todo
  console.log("New post request");
  let todo = new Todo(req.body);

  //save it to the database
  todo.save((err, returnedTodo) => {
    if (err) {
      return res.status(400).json({ err: "Not able to save todo" });
    } else {
      res.json({ id: returnedTodo._id });
    }
  });
});

//UPDATE todo
todoRouter.put("/:id", (req, res) => {
  let id = req.params.id;
  console.log(`PUT ${id}`);

  //find the object with that id and update
  Todo.findByIdAndUpdate(
    id,
    { title: req.body.title, is_complete: req.body.is_complete },
    { new: true },
    (error, result) => {
      if (error) {
        return res.json({ error: "Object couldn't be updated" });
      }
      res.json({ id: result._id });
    }
  );
});

//DELETE todo
todoRouter.delete("/:id", (req, res) => {
  let id = req.params.id;
  console.log(`DELETE ${id}`);

  //find the object and delete
  Todo.findByIdAndDelete(id, (error, result) => {
    if (error) {
      return res.json("Couldn't delete object");
    }
    //return ack
    res.json({ message: "Deleted" });
  });
});

module.exports = todoRouter;
