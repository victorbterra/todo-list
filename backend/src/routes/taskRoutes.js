// AQUI ESTÃO TODAS AS ROTAS DA APLICAÇÃO
import express from "express";
import auth from "../middlewares/auth.js";
import Task from "../models/taskModels.js";


const router = express.Router();

// 🔹 Criar uma nova tarefa
router.post("/", auth, async (req, res) => {
  try {
    const {
      title, 
      description, 
      status, 
      completed, 
      priority, 
      dueDate} = req.body;
    const task = new Task({
      title, 
      description, 
      status, 
      user: req.user._id, 
      completed, 
      priority, 
      dueDate
    });

    await task.save();
    res.status(201).json({message:"Tarefa criada com sucesso !"},task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
});

// 🔹 Buscar todas as tarefas
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
});

// 🔹 Atualizar uma tarefa por ID
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
});

// 🔹 Excluir uma tarefa por ID
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarefa excluída" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir tarefa" });
  }
});

export default router;
