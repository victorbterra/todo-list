// Importa módulos
import express from "express"; // Importa o módulo express
import bcrypt from "bcryptjs"; // Importa o módulo bcryptjs para criptografia de senhas
import jwt from "jsonwebtoken"; // Importa o módulo jsonwebtoken para criação de tokens JWT
import { body, validationResult } from "express-validator"; // Importa funções do express-validator para validação de dados
import User from "../models/authModels.js"; // Importa o modelo de usuário

const router = express(); // Cria um roteador do express

/**
 * @route POST /register
 * @description Registra um novo usuário
 * @access Público
 * @param {string} nome - O nome do usuário
 * @param {string} email - O email do usuário
 * @param {string} senha - A senha do usuário
 * @returns {object} - Uma mensagem de sucesso ou uma mensagem de erro
 */
router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("Nome é obrigatório"), // Valida se o campo nome não está vazio
        body("email").isEmail().withMessage("Email inválido"), // Valida se o campo email é um email válido
        body("password").isLength({ min: 8 }).withMessage("Senha deve ter no mínimo 6 caracteres"), // Valida se a senha tem no mínimo 8 caracteres
    ],
    async (req, res) => {
        const errors = validationResult(req); // Armazena os erros de validação
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Retorna erros se houver

        const { name, email, password } = req.body; // Desestrutura os campos do corpo da requisição

        try {
            let user = await User.findOne({ email }); // Verifica se o usuário já existe
            if (user) return res.status(400).json({ msg: "Usuário já existe" }); // Retorna erro se o usuário já existir

            const salt = await bcrypt.genSalt(10); // Gera um salt para a senha
            const senhaCriptografada = await bcrypt.hash(senha, salt); // Criptografa a senha

            user = new User({ nome, email, senha: senhaCriptografada }); // Cria um novo usuário
            await user.save(); // Salva o usuário no banco de dados

            res.json({ msg: "Usuário registrado com sucesso!" }); // Retorna mensagem de sucesso
        } catch (error) {
            res.status(500).json({ msg: "Erro no servidor" }); // Retorna erro de servidor
        }
    }
);

/**
 * @route POST /login
 * @description Faz login de um usuário
 * @access Público
 * @param {string} email - O email do usuário
 * @param {string} senha - A senha do usuário
 * @returns {object} - Um token JWT ou uma mensagem de erro
 */
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Email inválido"), // Valida se o campo email é um email válido
        body("senha").notEmpty().withMessage("Senha é obrigatória"), // Valida se o campo senha não está vazio
    ],
    async (req, res) => {
        const errors = validationResult(req); // Armazena os erros de validação
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Retorna erros se houver

        const { email, password } = req.body; // Desestrutura os campos do corpo da requisição

        try {
            const user = await User.findOne({ email }); // Verifica se o usuário existe
            if (!user) return res.status(400).json({ msg: "Usuário não encontrado" }); // Retorna erro se o usuário não existir

            const isMatch = await bcrypt.compare(password, user.password); // Compara a senha fornecida com a senha armazenada
            if (!isMatch) return res.status(400).json({ msg: "Senha incorreta" }); // Retorna erro se a senha estiver incorreta

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Gera um token JWT

            res.json({ token }); // Retorna o token
        } catch (error) {
            res.status(500).json({ msg: "Erro no servidor" }); // Retorna erro de servidor
        }
    }
);

export default router; // Exporta o roteador