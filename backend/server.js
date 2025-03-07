import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Bem vindo ao servidor.");
});

//listen to port

app.listen(PORT, () =>
  console.log(
    `🚀 Servidor rodando na porta ${PORT} acesso: http://localhost:${PORT}`
  )
);

// mongodb connection
