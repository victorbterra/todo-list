// AQUI ESTÃO TODAS AS ROTAS DA APLICAÇÃO
import express from "express";
import Task from "../models/taskModels.js";

const router = express.Router();

// 🔹 Criar uma nova tarefa
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
});

// 🔹 Buscar todas as tarefas
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
});

// 🔹 Atualizar uma tarefa por ID
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarefa excluída" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir tarefa" });
  }
});

export default router;
