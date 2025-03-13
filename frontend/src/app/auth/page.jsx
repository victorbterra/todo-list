"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Alterna entre login e registro
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  // Função para atualizar os dados do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para validar os campos do formulário
  const validateForm = () => {
    if (!isLogin && !formData.name.trim()) {
      setMessage({ type: "error", text: "O nome é obrigatório!" });
      return false;
    }

    if (!formData.email.trim() || !formData.password.trim()) {
      setMessage({ type: "error", text: "Preencha todos os campos!" });
      return false;
    }

    if (formData.password.length < 8) {
      setMessage({
        type: "error",
        text: "A senha deve ter pelo menos 8 caracteres!",
      });
      return false;
    }

    return true;
  };

  // Função para lidar com envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    setLoading(true);

    try {
      const url = isLogin
        ? "http://localhost:5000/auth/login"
        : "http://localhost:5000/auth/register";

      const response = await axios.post(url, formData);

      if (isLogin) {
        const token = response.data.token;
        const name = response.data.name;

        if (token && name) {
          // Armazena o token e o nome do usuário no localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("userName", name);
          setMessage({
            type: "success",
            text: "Login bem-sucedido! Redirecionando...",
          });

          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      } else {
        setMessage({
          type: "success",
          text: "Cadastro realizado com sucesso!",
        });

        setTimeout(() => {
          setIsLogin(true); // Alterna para tela de login
          setMessage({ type: "", text: "" }); // Reseta a mensagem após o redirecionamento
          setFormData({ name: "", email: "", password: "" }); // Limpa os campos
        }, 2000);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Erro ao processar requisição.";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Criar Conta"}
        </h2>

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

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Aguarde..." : isLogin ? "Entrar" : "Registrar"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage({ type: "", text: "" });
              setFormData({ name: "", email: "", password: "" });
            }}
            className="text-blue-500 underline"
          >
            {isLogin ? "Criar Conta" : "Fazer Login"}
          </button>
        </p>
      </div>
    </div>
  );
}