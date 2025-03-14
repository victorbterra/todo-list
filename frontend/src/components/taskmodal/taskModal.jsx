// frontend/src/components/Modal.jsx
"use client";

// frontend/src/components/taskmodal/taskModal.jsx
import React, { useState } from "react"; // Importa o hook useState do React
import { useRouter } from "next/navigation";

// Define o componente Taskmodal
const Taskmodal = ({ isOpen, onClose, onSubmit }) => {
  const router = useRouter();
  // Recebe as props isOpen, onClose e onSubmit
  // Estados para armazenar os valores dos inputs
  const [title, setTitle] = useState(""); // Estado para o título da tarefa
  const [description, setDescription] = useState(""); // Estado para a descrição da tarefa
  const [priority, setPriority] = useState("Média"); // Estado para a prioridade da tarefa (padrão: Média)
  const [dueDate, setDueDate] = useState(""); // Estado para a data de término da tarefa
  const [message, setMessage] = useState({ type: "", text: "" });

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação: verifica se os campos obrigatórios estão preenchidos
    if (!title.trim() || !description.trim()) {
      setMessage({ type: "error", text: "O nome é obrigatório!" });
      return;
    }

    if (!dueDate) {
      setMessage({
        type: "error",
        text: "A data de vencimento é obrigatória!",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Pegando o token salvo no localStorage
      if (!token) {
        setMessage({
          type: "error",
          text: "Tempo de login expirado. Faça o login novamente!",
        });
        setTimeout(() => {
          router.push("/auth");
        }, 2000);
        return;
      }

      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          dueDate,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage({
          type: "error",
          text: errorData.message || "Erro ao criar a tarefa.",
        });
        return;
      }
      
      // Exibe mensagem de sucesso
      setMessage({
        type: "success",
        text: "Tarefa criada com sucesso!",
      });

      // Limpa os campos e fecha o modal
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Média");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Erro na requisição:", error);
      setMessage({ type: "error", text: "Erro ao criar a tarefa." });
    }
  };

  // Retorna o JSX do componente
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center z-10 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-neutral-900 opacity-50">
        {/* FUNDO COM OPACIDADE */}
      </div>
      <div className="relative bg-white rounded-lg shadow-lg p-4 mx-4 items-center z-20">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-2">Adicionar Tarefa</h2>
          <button
            className=" text-neutral-900 text-xl font-bold py-2 px-4 hover:bg-neutral-900 hover:text-white duration-100 rounded-full"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div>
          {message.text && (
            <p
              className={`text-sm text-center p-2 mb-4 rounded ${
                message.type === "error"
                  ? "bg-red-200 text-red-700"
                  : "bg-green-200 text-green-700"
              }`}
            >
              {message.text}
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="my-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título da tarefa"
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição da tarefa"
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
          />
          <label>Prioridade da tarefa</label>
          <select
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <label>Data de término da tarefa</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full duration-100"
          >
            Adicionar Tarefa
          </button>
        </form>
      </div>
    </div>
  );
};

export default Taskmodal;
