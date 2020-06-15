const express = require("express");
const app = express();
const monggose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

//route imports
const todosRouter = require("./routes/todos");
const todoRouter = require("./routes/todo");

//enable cors and bodyparser
app.use(cors());
app.use(bodyParser.json());

//connect to the database
monggose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

//GET todos.
app.use("/todos", todosRouter);

//todo routes
app.use("/todo", todoRouter);

app.listen(5000, () => console.log("Listening at 5000"));
