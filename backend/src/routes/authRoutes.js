// Importa módulos
import dotenv from "dotenv"; // Importa o módulo dotenv para acessar variáveis de ambiente
import express from "express"; // Importa o módulo express
import bcrypt from "bcryptjs"; // Importa o módulo bcryptjs para criptografia de senhas
import jwt from "jsonwebtoken"; // Importa o módulo jsonwebtoken para criação de tokens JWT
import { body, validationResult } from "express-validator"; // Importa funções do express-validator para validação de dados
import User from "../models/authModels.js"; // Importa o modelo de usuário

dotenv.config(); // Configura as variáveis de ambiente
const app = express(); // Cria um roteador do express

/**
 * @route POST /register
 * @description Registra um novo usuário
 * @access Público
 * @param {string} nome - O nome do usuário
 * @param {string} email - O email do usuário
 * @param {string} senha - A senha do usuário
 * @returns {object} - Uma mensagem de sucesso ou uma mensagem de erro
 */
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Valida se todos os campos foram preenchidos
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }

    // Verifique se o usuário já existe no banco de dados
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Este e-mail já está cadastrado!" });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor!" });
  }
});

/**
 * @route POST /login
 * @description Faz login de um usuário
 * @access Público
 * @param {string} email - O email do usuário
 * @param {string} senha - A senha do usuário
 * @returns {object} - Um token JWT ou uma mensagem de erro
 */

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação manual dos campos
    if (!email || !password) {
      return res.status(400).json({ msg: "E-mail e senha são obrigatórios." });
    }

    // Verifica se o email é válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "E-mail inválido." });
    }

    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Usuário não encontrado." });
    }

    // Verifica se a senha está correta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Senha incorreta." });
    }

    // Gera um token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ msg: "Erro no servidor." });
  }
});

export default app; // Exporta o roteador
