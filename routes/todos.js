const express = require("express");
const todosRouter = express.Router();
const Todo = require("../models/todo");

todosRouter.get("/", (req, res) => {
  console.log("GET todos request");

  //read all the objects from the database
  Todo.find({}, (error, result) => {
    if (error) {
      return res.status(404).json({ error: "Objects not found" });
    }
    res.json(result);
  });
});

module.exports = todosRouter;
