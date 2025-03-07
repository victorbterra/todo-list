import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Campo obrigatório
  description: { type: String, default: "" }, // Opcional
  completed: { type: Boolean, default: false }, 
  priority: { type: String, enum: ["Baixa", "Média", "Alta"], default: "Média" }, 
  dueDate: { type: Date, default: null },  
  createdAt: { type: Date, default: Date.now }, 
});

const Task = mongoose.model("Task", taskSchema);

export default Task;