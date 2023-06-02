const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema)
const router = express.Router();

// GET ALL THE TODO
router.get("/", async (req, res) => {
    try {
        const todos =await Todo.find({status: "active"});
        res.status(200).send(todos)
    } catch (err) {
        res.status(500).send({ error: "There was a server side error!" })
    }
})

// GET A TODO ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const todo = await Todo.findById(id);
  
      if (!todo) {
        return res.status(404).send({ error: 'Todo not found' });
      }
  
      res.status(200).send(todo);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'There was a server side error!' });
    }
})

// POST TODO
router.post("/", async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(200).send({ message: "Todo was inserted successfully!" });
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: "There was a server side error!" });
    }
})

// POST MULTIPLE TODO
router.post("/all", async (req, res) => {
    try {
        await Todo.insertMany(req.body);
        res.status(200).send({ message: "Todos were inserted successfully!" })
    } catch (err) {
        res.status(500).send({ error: "There was a server side error!" })
    }
})

// PUT TODO
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
  
    try {
      const updatedTodo = await Todo.updateOne(
        { _id: id },
        { $set: { title, description, status } }
      );

      if (updatedTodo.modifiedCount === 0) {
        return res.status(404).send({ error: 'Todo not found' });
      }
  
      res.status(200).send({ message: 'Todo updated successfully' });
    } catch (err) {
        console.error(err);
      res.status(500).send({ error: 'There was a server side error!' });
    }
})

// DELETE TODO
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const deletedTodo = await Todo.findByIdAndRemove(id);
  
      if (!deletedTodo) {
        return res.status(404).send({ error: 'Todo not found' });
      }
  
      res.status(200).send({ message: 'Todo deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'There was a server side error!' });
    }
})

module.exports = router;