import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Campo obrigatório
  description: { type: String, default: "" }, // Opcional
  status: { type: String, enum: ["pendente", "concluída"], default: "pendente" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Referência ao usuário
  completed: { type: Boolean, default: false }, 
  priority: { type: String, enum: ["Baixa", "Média", "Alta"], default: "Média" }, 
  dueDate: { type: Date, default: null },  
  createdAt: { type: Date, default: Date.now }, 
});

const Task = mongoose.model("tasks", taskSchema);

export default Task;